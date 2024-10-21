// @ts-nocheck
"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import UploadFile from "../../UploadFile/App";
import React, {
  useState,
  useEffect,
  useRef,
  use,
  useId,
  FormEvent,
} from "react";
import { useSession, getSession } from "next-auth/react";
import { Session } from "next-auth";
import { Message } from "../../../../../../types";

//Utilis and helper functions
import { isClient } from "@/utilis/isClient";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { checkSession } from "@/utilis/CheckSession";
import ButtonLoadingComponent from "../../../../components/buttonComponet";

// import { Header } from "@/app/components/Header";
// Dashboard

import { useChatConversation } from "@/hooks/ConversationContext";
import useCreateConversation from "@/hooks/createConversation";
import useConversations from "@/hooks/useConversations";
//Chat Container
import { ChatContainer } from "../../ChatContainer";
import { ChatMessagesContainer } from "../../ChatMessage";
import { Guidelines } from "../../components/Guidelines";

import axios from "axios";

// import FloatingScrollButton from "@/app/components/ScrollToBottomButton";
// import OpenChatContainer from "@/app/components/helper/openChatContainerComponent";
// import { useSessionGate } from "@/app/profile/_middlewhere";
// import LoadingComponent from "@/app/components/helper/Loading";
export default function ConversationPage() {
  const chatBotUrl = " http://127.0.0.1:5000/chat";
  const generatePdfUrl = " http://127.0.0.1:5000/generate_pdf";

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  //Should wrap these in a bigger function since being used multiple times?

  const [sessionStatus, setSessionStatus] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [showGuidelines, setShowGuidelines] = useState(true);

  const [pdfImages, setPdfImages] = useState<string[]>([]);
  const [selectedPdfImage, setSelectedPdfImage] = useState<string | null>(null);

  //List of Backround PDF imagse
  const [backgroundImages, setBackgroundImages] = useState<string[]>([]);

  const {
    userName,
    setUserName,
    splitUserName,
    email,
    setEmail,
    setSplitUserName,
  } = useSessionStorage();

  const { responses, setResponses, message, setMessage } =
    useChatConversation();

const localStorageConvoId = localStorage.getItem("currentConversationId");
  useEffect(() => {
    if (localStorageConvoId) {
      setCurrentConversationId(localStorageConvoId);
    }
  }, []);

  const { data: session, status } = useSession();
  const [messagesIsLoading, setMessagesIsLoading] = useState<null | boolean>(
    null
  );

  const [isReponseLoading, setResponseLoading] = useState<boolean>(false);

  //Set the conversation
  const [currentConversationId, setCurrentConversationId] = useState<
    number | string | null
  >(null);

  // const [newTitle, setNewTitle] = useState("");

  const { conversations, isLoading, setConversations } = useConversations(
    session as any
  );

  //Creating a new Conversation.
  const { createConversation, newTitle, setNewTitle, isCreateLoading, error } =
    useCreateConversation(
      session as Session,
      setConversations as any,
      setCurrentConversationId
    );

  useEffect(() => {
    checkSession(status, {
      setUserId,
      setUserName,
      setSessionStatus,
      setEmail,
      setSplitUserName,
      isClient,
      session,
      router,
      email,
      userName,
      splitUserName,
    });
  }, [status]);

  //This funcitno shifts and shows the mobile Chat ccontainer
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAtZero, setIsAtZero] = useState<boolean>(false); // State to track the position

  const handleMobileChatBtnClick = () => {
    if (chatContainerRef.current) {
      if (isAtZero) {
        chatContainerRef.current.style.transform = "translateX(-100%)";
      } else {
        chatContainerRef.current.style.transform = "translateX(0px)";
      }
      setIsAtZero(!isAtZero); // Toggle the state
    }
  };

  // Effect to handle viewport resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 950 && chatContainerRef.current) {
        chatContainerRef.current.style.transform = "translateX(0px)";
        setIsAtZero(false); // Reset the state
      } else if (chatContainerRef.current) {
        chatContainerRef.current.style.transform = "translateX(-100%)";
        setIsAtZero(true); // Reset the state
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (userName !== null) {
      sessionStorage.setItem("userName", userName);
    }

    if (splitUserName !== "") {
      sessionStorage.setItem("splitUserName", splitUserName);
    }
  }, [userName, splitUserName]);

  const [editTitleId, setEditTitleId] = useState<null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [titleUpdated, setTitleUpdated] = useState<boolean>(false); // New state for title updates

  //Editing the ability to change the existing title.
  const handleTitleClick = (convoId: string | number) => {
    const conversation = conversations.find(
      (convo) => (convo as any).conversationId === convoId
    );

    if (conversation) {
      setEditTitleId((conversation as any).conversationId);
      setEditedTitle((conversation as any).title);
      setEditingTitle(true as boolean);
    } else {
      // console.log(`Conversation with ID ${convoId} not found`);
    }
  };
  useEffect(() => {}, [editTitleId, editedTitle]);

  const handleTitleChange = (event: any) => {
    setEditedTitle(event.target.value);
  };

  async function getConversation(conversationId: any) {
    try {
      const response = await fetch(`/api/${conversationId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch conversation");
      }

      const updatedConversation = await response.json();
      // console.log(
      //   "Logging the converations before errorw",
      //   updatedConversation
      // );
      // Update local state
      setConversations((prevConversations) => {
        return prevConversations.map((convo) =>
          convo === conversationId
            ? { ...convo, title: updatedConversation.title }
            : convo
        );
      });

      updateLocalStorage(updatedConversation, conversationId);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      throw error; // Re-throw to handle it in the UI layer
    }
  }

  async function deleteConversation(conversationId: string | number) {
    const currentConversations = conversations;


    console.log("Conversation ID", conversationId);

    // Optimistically remove the conversation from UI
    const updatedConversations = currentConversations.filter(
      (convo) => (convo as any).conversationId !== conversationId
    );

    setConversations(updatedConversations);
    sessionStorage.setItem(
      "conversations",
      JSON.stringify(updatedConversations)
    );

    try {
      const response = await fetch(`/api/deleteConversations/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: conversationId }),
      });
      if (!response.ok) {
        throw new Error("Failed to delete the conversation");
      }

      // Filter out the deleted conversation
      const updatedConversations = conversations.filter(
        (convo) => (convo as any).converatoinID !== conversationId
      );
      // console.log("Logging out the Conversation Filter", conversations);

      // Update state and local storage
      setConversations(updatedConversations); // Update React state
      sessionStorage.setItem(
        "conversations",
        JSON.stringify(updatedConversations)
      ); // Update local storage

  

      if (response.ok) {
        // Update the conversations state
        const updatedConversations = conversations.filter(
          (convo) => (convo as any).conversationId !== conversationId
        );
        setConversations(updatedConversations);

        // Update the session storage
        sessionStorage.setItem(
          "conversations",
          JSON.stringify(updatedConversations)
        );
        router.push(`/ai/chat`);
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
      alert("Could not delete the conversation. Please try again.");
    }
  }

  function updateLocalStorage(
    updatedConversation: any,
    conversationId: number
  ) {
    const cachedConversations = sessionStorage.getItem("conversations");

    if (cachedConversations) {
      try {
        // Parse the cached conversations
        const parsedConversations = JSON.parse(cachedConversations);

        // Ensure that parsedConversations is an array
        if (Array.isArray(parsedConversations)) {
          const updatedCache = parsedConversations.map((convo) =>
            convo.conversationId === conversationId
              ? { ...convo, title: updatedConversation.title }
              : convo
          );

          sessionStorage.setItem("conversations", JSON.stringify(updatedCache));
        } else {
          console.error("Parsed cached conversations is not an array");
        }
      } catch (e) {
        console.error("Error parsing cached conversations:", e);
      }
    }
  }

  const handleSubmitTitle = async (event: any) => {
    event.preventDefault(); // Prevent form submission
    let titleChange: string = "";


    console.log("Event Key", event.key);
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission
      const newTitle = editedTitle; // Capture the title at the time of submission
      titleChange = editTitleId ?? "";
      // console.log("New title to be set:", newTitle);
      // console.log("New title Id being logged", editTitleId);

      if (editTitleId !== null && editTitleId !== "") {
        const updatedConversations = conversations.map((convo) =>
          (convo as any).conversationId === editTitleId
            ? { ...convo, title: newTitle }
            : convo
        );
        setConversations(updatedConversations);
        // console.log("Updated conversations:", updatedConversations);

        sessionStorage.setItem(
          "conversations",
          JSON.stringify(updatedConversations)
        );

        setEditTitleId(null); // Exit edit mode
        setEditedTitle(""); // Clear the edited title state
        setEditingTitle(false);
      }
    }
    const localConversationId = localStorage.getItem("currentConversationId");
    console.log("Local Conversation ID", localConversationId);
    try {
      const response = await fetch(`/api/submitTitle/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editedTitle, id: localConversationId }), // Send editedTitle directly
      });

      // console.log("Are you sending the new Title", editedTitle);

      if (response.ok) {
        // await getConversation(editTitleId);
        setEditingTitle(false);
        setTitleUpdated((prev) => !prev); // Toggle the titleUpdated state
      }

      if (!response.ok) {
        throw new Error("Failed to update title");
      }
    } catch (error) {
      console.error("Error updating title:", error);

      // If the update fails, revert the change in the UI and alert the user
      const originalConversations = conversations.map((convo) =>
        convo.conversationId === editTitleId
          ? { ...convo, title: (convo as any).title }
          : convo
      );

      setConversations(originalConversations);
      sessionStorage.setItem(
        "conversations",
        JSON.stringify(originalConversations)
      );

      alert("Failed to update title, please try again."); // Inform the user
    }
  };

  const chatDashBoardRef = useRef<HTMLDivElement>(null);
  // Check for special commands
    const specialCommands = {
      'br': '$br',
      'down': '$down',
      'help': '$help',
      'listbr': '$listbr',
      'new': '$new',
      'pdf': '$pdf',
      'rem': '$rem',
      'usage': '$usage',
    };

  useEffect(() => {
    const loadPdfImages = () => {
      // Assuming the public folder is at the root of your project
      const pdfImagesContext = (require as any).context(
        "/public/pdfImage",
        false,
        /\.(png|jpe?g|gif)$/i
      );
      const imageFiles = pdfImagesContext
        .keys()
        .map((key) => `/pdfImage${key.replace(".", "")}`);
      setPdfImages(imageFiles);
    };

    loadPdfImages();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      console.log("Empty message, returning");
      return;
    }

    setMessagesIsLoading(true);

    const command = message.trim().split(" ")[0].toLowerCase().replace("/", "");

    console.log("Command", command);

    if (command === "$listbr") {
      setResponses((prevResponses) => [
        ...prevResponses,
        {
          question: message,
          response: "Here are your PDF images:",
          imageUrl: pdfImages, // Add the loaded PDF images
          id: Date.now().toString(),
        },
      ]);
      setMessage(""); // Clear the message input
      setMessagesIsLoading(false);
      return; // Exit the function after ha
    }

    // New functionality to handlendle $br <num>
    if (command.startsWith("$br")) {

    }

    

    if (command === "$br") {
      

      const index = parseInt(message.split(" ")[1], 10); // Get the number after $br
      if (!isNaN(index) && index >= 0 && index < pdfImages.length) {
        console.log("Selected PDF image", index, "Path:", pdfImages[index]);
        

        // Log the path to the selected PDF image
        setSelectedPdfImage(pdfImages[index]); // Set the selected PDF image by index
      } else {
        console.log("Invalid index for PDF selection");
      }
      setMessagesIsLoading(false);
      return;
    }

    if (command === "$pdf") {

      console.log("Selected PDF image", selectedPdfImage);

      uploadImage(selectedPdfImage as string, message as string);
      setMessagesIsLoading(false);
      return
    }

    if(command === "$help") {
      const commandList = Object.keys(specialCommands).join(", "); // Create a list of commands
      setResponses((prevResponses) => [
        ...prevResponses,
        {
          question: message,
          response: `Here are your available commands: $${commandList}`, // Update response to show commands
          id: Date.now().toString(),
        },
      ]);
      setMessagesIsLoading(false);
      return;
    }

    async function uploadImage(imagePath: string, message: string) {
      // Fetch the image as a Blob
      const response = await fetch(imagePath);
      const blob = await response.blob(); // Convert the response to a Blob
      const file = new File([blob], "image.png", { type: blob.type }); // Create a File object
    
      const formData = new FormData();
      formData.append('file', file); // Change 'files' to 'file'
      formData.append('message', message); // Add the message to the form data

      fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
  
      })
      .then(response => {
        if (response.ok) {
          // Check if the response is a PDF
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/pdf")) {
            // Handle PDF download
            return response.blob().then(blob => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'output.pdf'; // Specify the download name
              document.body.appendChild(a);
              a.click();
              a.remove();
            });
          } else {
            // Handle JSON response
            return response.json();
          }
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(data => {
        console.log('Upload successful:', data);
      })
        .catch(error => {
          console.error('Error uploading image:', error); 
        });
    }

    if (command === "$rem") {
      await handleUploadFile(e); // Call handleUploadFile directly
      console.log("Remove command", message);
      setMessage("");
      return
    }







    
    

    // Check for the /upscale command
    if (command === "upscale") {
      await handleUploadFile(e); // Call handleUploadFile directly
      return; // Exit the function after handling the upscale command
    }

    if (command in specialCommands) {
      // Handle special command
      await handleSpecialCommand(command, message, e);
    } else {
      // Regular chat flow
      if (isClient()) {
        if (!currentConversationId) {
          console.log("Creating new conversation");
          await createConversation().then((convoID) => {
            console.log("New conversation created with ID:", convoID);
            setCurrentConversationId(convoID);
            sessionStorage.setItem("currentConversationId", convoID);
            localStorage.setItem("currentConversationId", convoID);
          });
        }

        const updatedConversationId = localStorage.getItem(
          "currentConversationId"
        );

        // 1. Set up the new response without any bot response yet.
        const newResponse = {
          question: message,
          response: "",
          id: "temp",
        };

        // Use functional update for state
        setResponses((responses) => [...responses, newResponse]);

        setMessage("");

        console.log("Chat is still bieng called", responses);

        try {
          // 2. Fetch bot reply from the API
          const botReply = await fetch(chatBotUrl, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
          },
            mode: 'cors',
            body: JSON.stringify({
              userId: session?.user.id,
              message,
              conversationId: currentConversationId,
            }),
          }).then((res) => res.json());
          setResponseLoading(false);

          // 3. Update the responses array with the bot's reply
          setResponses((prevResponses) =>
            prevResponses.map((resp) => {
              if (resp.question === message) {
                return { ...resp, response: botReply.response };
              }
              return resp;
            })
          );

          // console.log("Logging the new Responses", responses);

          console.log("Logging the bot reply", botReply);
          await fetch("/api/messages", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              userId: session?.user.id, // Ensure you have the current user's ID
              conversationId: updatedConversationId,
              userContent: message, // User's message
              botResponse: botReply.response, // Bot's response, obtained separately
              imageUrl: "",
            }),
          });

          //Add the conversations arrawy or update
        } catch (error) {
          console.error("Error handling submission:", error);
        }
      }
    }
  };

  const [, setfileURL] = useState("");
  const [selectedFile, setselectedFile] = useState(null);
  const [uploadedFile, setuploadedFile] = useState({});
  const [isUploading, setisUploading] = useState(false);
  const [isFileUploaded, setisFileUploaded] = useState(false);
  const [uploadProgress, setuploadProgress] = useState(0);
  let uploadInput = React.createRef();
  

  // Update handleDrop to work like handleSelectFile
  const handleSelectFile = (e) => {
    const selectedFileList = [];
    for (let i = 0; i < e.target.files.length; i++) {
      selectedFileList.push(e.target.files.item(i));
    }
    setselectedFile(selectedFileList);
  };
  // Upload file to server
  const handleUploadFile = async (e) => {
    e.preventDefault();

    setisUploading(true);
    const data = new FormData();
    console.log("THe upload input", uploadInput.files);

    // Append the file to the request body
    for (let i = 0; i < uploadInput.files.length; i++) {
      data.append("file", uploadInput.files[i], uploadInput.files[i].name);
    }

    const newResponse = {
      question: message,
      response: "",
      id: "temp",
    };

    setResponses((responses) => [...responses, newResponse]);

    setMessage("");

    console.log("LOggin he data", data);
    try {
      const config = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          setuploadProgress(Math.round((loaded / total) * 100));
        },
      };
      const response = await axios.post(
        "http://127.0.0.1:5000/process_image",
        data,
        config
      );
      const body = response.data;

      console.log("Logging the response", response.data);
      setResponses((prevResponses) =>
        prevResponses.map((resp) => {
          if (resp.question === message) {
            // Set imageUrl directly instead of an array
            const newImageUrl = response.data.image_url.startsWith('http')
              ? response.data.image_url // Use the existing URL if it already has the protocol
              : `http://127.0.0.1:5000${response.data.image_url}`; // Prepend the base URL if not
            return {
              ...resp,
              imageUrl: newImageUrl, // Set the new URL directly
            };
          }
          return resp;
        })
      );
      console.log("Logging the responses", responses);

      const updatedConversationId = sessionStorage.getItem(
        "currentConversationId"
      );

      console.log("Logging the response data", response.data.responses);

      await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id, // Ensure you have the current user's ID
          conversationId: updatedConversationId,
          userContent: message, // User's message
          imageUrl: `http://127.0.0.1:5000${response.data.image_url}`, // Image URL from the bot
        }),
      });

      console.log("Returning the body", body);
      setfileURL(`${chatBotUrl}/${body.filename}`);
      if (response.status === 200) {
        setisFileUploaded(true); // flag to show the uploaded file
        setisUploading(false);
        setuploadedFile(selectedFile); // set the uploaded file to show the name
      }
    } catch (error) {
      console.error(error);
      setisUploading(false);
    }
  };
  const handleSpecialCommand = async (
    command: string,
    fullMessage: string,
    e: FormEvent
  ) => {
    const baseUrl = "http://127.0.0.1:5000";
    let commandEndpoint;
    let requestBody;

    if (command === "upscale") {
      console.log("Upscale Command", fullMessage);
    } else if (command === "generate") {
      console.log("Generate Command", fullMessage);
      console.log("User ID:", session?.user.id);
      console.log(
        "Content:",
        fullMessage.substring(fullMessage.indexOf(" ") + 1)
      );
      console.log("Logo Image:", selectedFile ? selectedFile[0].name : null);
      console.log("Background Image:", "");
      console.log(
        "Filename:",
        `user_report_${
          new Date().toISOString().replace(/[-:]/g, "").split(".")[0]
        }.pdf`
      );

      commandEndpoint = generatePdfUrl;
      requestBody = {
        userId: session?.user.id,
        content: fullMessage.substring(fullMessage.indexOf(" ") + 1),
        logo_image: selectedFile ? selectedFile.name : null,
        background_image: "",
        filename: `user_report_${
          new Date().toISOString().replace(/[-:]/g, "").split(".")[0]
        }.pdf`,
        conversationId: currentConversationId,
      };
      console.log("Loggin the request body", requestBody);
      console.log("Request Body:", JSON.stringify(requestBody, null, 2));
    } else {
      commandEndpoint = `${baseUrl}${
        specialCommands[command as keyof typeof specialCommands]
      }`;
      requestBody = {
        userId: session?.user.id,
        message: fullMessage,
        conversationId: currentConversationId,
      };
    }

    console.log("Command Endpoint:", commandEndpoint);

    try {
      const response = await fetch(commandEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (command === "generate") {
        // Handle PDF response
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = requestBody.filename as string;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        // Update UI to indicate successful PDF generation
        setResponses((prevResponses) => [
          ...prevResponses,
          {
            question: fullMessage,
            response: "PDF generated successfully. Check your downloads.",
            id: Date.now().toString(),
          },
        ]);
      } else {
        // Handle JSON response for other commands
        const data = await response.json();
        console.log(`Command ${command} response:`, data);

        // Update UI with command response
        setResponses((prevResponses) => [
          ...prevResponses,
          {
            question: fullMessage,
            response: data.response,
            id: Date.now().toString(),
          },
        ]);
      }
    } catch (error) {
      console.error(`Error executing command ${command}:`, error);
      // Update UI with error message
      setResponses((prevResponses) => [
        ...prevResponses,
        {
          question: fullMessage,
          response: `Error executing command: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
          id: Date.now().toString(),
        },
      ]);
      setMessagesIsLoading(false);
    } finally {
      setMessagesIsLoading(false);
    }
  };

  const handleConversationClick = (convoId: string) => {
    const targetPath = `/ai/chat/${session?.user.id}/${convoId}`;

    router.push(targetPath, undefined);

    //Store the Current converatoinID in local to persit on chaning the navigation

    localStorage.setItem("currentConversationId", convoId);
    // console.log(
    //   "Logging the current conversation ID",
    //   localStorage.getItem("currentConversationId")
    // );

    const localStorageConvoId = localStorage.getItem("currentConversationId");
    setCurrentConversationId(convoId);
  };

  //Get the full Message Conversation.

  const clearStorage = () => {
    sessionStorage.removeItem("initialMessage");
  };

  //Another Hook Check for the local storage
  useEffect(() => {
    if (currentConversationId) {
      handleConversationClick(currentConversationId as string);
    }
    clearStorage();
  }, [currentConversationId]); // Dependency array includes state that triggers this effect

  useEffect(() => {}, [isLoading]);

  //Checking if Chat conversations is loading
  useEffect(() => {}, [messagesIsLoading]);
  useEffect(() => {}, [isReponseLoading]);

  //Fetch Message for this converations
  const messagesRefCounter = useRef(0);
  useEffect(() => {}, [messagesRefCounter]);
  const fetchMessagesForConversation = async (conversationId: string) => {
    messagesRefCounter.current += 1;
    if (messagesRefCounter.current > 1) {
      return;
    }

    if (!session || !session.user || !session.user.id) {
      console.error("No user session available");
      return;
    }
    setMessagesIsLoading(true);

    console.log("Fetching messages for conversation:", conversationId);

    if (!conversationId) {
      console.error("no conversatoin ID");
      return;
    } else {
      try {
        const response = await fetch(
          `/api/storedMessages?authorId=${session?.user.id}&conversationId=${conversationId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const messages = await response.json();

        // console.log("Add the IDS",messages.map(msgs => msgs.id))

        // Map API response to expected format in state
        //Naming conventions matter
        const formattedMessages = messages.map((msg: Message) => ({
          question: msg.userContent,
          response: msg.botResponse,
          imageUrl: msg.imageUrl,
          id: msg.id,
        }));

        setResponses([]);

        if (response.ok) {
          setResponses(formattedMessages);
        }
        setMessagesIsLoading(false);
      } catch (error) {
        setMessagesIsLoading(true);
        console.error("Error fetching messages:", error);
      }
    }
  };

  useEffect(() => {}, [responses]);

  useEffect(() => {
    setResponses([]); // Clear previous messages

    if (status === "authenticated" && session) {
      // Fetch messages for the current conversation if needed
      if (currentConversationId === null) {
        fetchMessagesForConversation(
          (currentConversationId as any) || localStorageConvoId
        );
      } else {
        // console.log("Fech is doing good", currentConversationId);
      }
    }
  }, [currentConversationId]);

  if (!conversations) {
    return <p>No conversation found.</p>;
  }

  const [chatContainerShown, setChatContainerShown] = useState<boolean>(false);
  const chatContainerToggle = () => {
    console.log("IS this being clicked??? Showon yes or no");
    setChatContainerShown(!chatContainerShown);
  };

  useEffect(() => {
    console.log("Responses", selectedFile);
  }, [selectedFile]);

  //Function takes you to the bottom of the div by clicking the floating button.

  return (
    <div className="chatDashboard text-white">
      {/* Chat Container Componet  */}

      <ChatContainer
        setConversations={setConversations}
        conversations={conversations}
        currentConversationId={currentConversationId}
        splitUserName={splitUserName}
        userName={userName || ""}
        email={email || ""}
        onConversationClick={handleConversationClick}
        onDeleteConvo={deleteConversation}
        onChangeConvoTitle={handleSubmitTitle}
        handleTitleClick={handleTitleClick}
        editTitleId={editTitleId}
        editedTitle={editedTitle}
        handleTitleChange={handleTitleChange}
        editingTitle={editingTitle}
        titleUpdated={titleUpdated}
        chatContainerRef={chatContainerRef as any}
        handleMobileChatBtnClick={handleMobileChatBtnClick}
      />

      {/* Chat Container Componet  */}

      <div
        ref={chatDashBoardRef}
        className="chatDashboardWrapper w-full text-left"
      >
        {/* <OpenChatContainer
          chatContainerToggle={chatContainerToggle}
          chatContainerShown={chatContainerShown}
        /> */}
        {/* Guidelines Hader */}

        {/* <Header
          showGuidelines={showGuidelines}
          setShowGuidelines={setShowGuidelines}
          handleMobileChatBtnClick={handleMobileChatBtnClick}
        /> */}

        <div className={`chatDashBoardContainer `}>
          {/* Dashboard Component  */}

          {responses.length > 0 ? (
            <ChatMessagesContainer responses={(responses as any) || []} />
          ) : (
            <div className="w-full flex items-center justify-center">
              {/* <LoadingComponent /> */}
            </div>
            // <Dashboard userName={userName || ""} />
          )}

          {/* Dashboard Component  */}

          {/* <UploadFile /> */}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="chatFormSubmit"
            // onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="relative textAreaContainer">
              <textarea
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    formRef.current?.requestSubmit();
                  }
                }}
                value={message}
                placeholder="Ask Thou Question..."
              ></textarea>

              <div className="textAreaIconWrapper flex flex-row gap-[11px]">
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleSelectFile}
                  ref={(ref) => {
                    uploadInput = ref;
                  }}
                />
                <button
                  className="textAreaIcon"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fill-rule="evenodd"
                      d="M9 7a5 5 0 0 1 10 0v8a7 7 0 1 1-14 0V9a1 1 0 0 1 2 0v6a5 5 0 0 0 10 0V7a3 3 0 1 0-6 0v8a1 1 0 1 0 2 0V9a1 1 0 1 1 2 0v6a3 3 0 1 1-6 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>

                <button type="submit" className="textAreaIcon">
                  {messagesIsLoading ?  <ButtonLoadingComponent /> : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 32 32"
                      className=""
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M15.192 8.906a1.143 1.143 0 0 1 1.616 0l5.143 5.143a1.143 1.143 0 0 1-1.616 1.616l-3.192-3.192v9.813a1.143 1.143 0 0 1-2.286 0v-9.813l-3.192 3.192a1.143 1.143 0 1 1-1.616-1.616z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {selectedFile && (
              <div className="mt-2">Selected file: {selectedFile[0].name}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
