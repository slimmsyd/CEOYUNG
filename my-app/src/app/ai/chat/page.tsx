// @ts-nocheck

"use client";
/* eslint-disable react-hooks/rules-of-hooks */

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

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

import dynamic from "next/dynamic";
import { MessageProvider } from "../../../utilis/MessageContext";//Utilis and helper functions
import { isClient } from "../../../utilis/isClient";
import { useSessionStorage } from "../../../hooks/useSessionStorage";
import { checkSession } from "@/utilis/CheckSession";
import ButtonLoadingComponent from "../../components/buttonComponet";


import { useChatConversation } from "../../../hooks/ConversationContext";
import useCreateConversation from "../../../hooks/createConversation";
import useConversations from "../../../hooks/useConversations";
//Chat Container
import { ChatContainer } from "./ChatContainer";
import { ChatMessagesContainer } from "./ChatMessage";
import { Guidelines } from "./components/Guidelines";
import axios from "axios";


import { Dashboard } from "./Dashboard";
const ChatDashboard: React.FC = () => {
  //Introduction Guidelines.

  const [showGuidelines, setShowGuidelines] = useState(true);

  useEffect(() => {
    const hasViewedGuidelines = localStorage.getItem("hasViewedGuidelines");
    if (hasViewedGuidelines) {
      setShowGuidelines(false);
    }
  }, []);

  const handleGuidelinesComplete = () => {
    localStorage.setItem("hasViewedGuidelines", "true");
    setShowGuidelines(false);
 };

 const chatBotUrl = " http://127.0.0.1:5000/chat";




  //First introduction From
  const {
    userName,
    setUserName,
    splitUserName,
    email,
    setEmail,
    setSplitUserName,
  } = useSessionStorage();

  const [responseLoading, setResponseLoading] = useState(false);
  


  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sessionStatus, setSessionStatus] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  // Form Ref
  const formRef = useRef<HTMLFormElement>(null);

  const [editTitleId, setEditTitleId] = useState<null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editingTitle, setEditingTitle] = useState<boolean>(false);
  const [titleUpdated, setTitleUpdated] = useState<boolean>(false); // New state for title updates

  const [currentConversationId, setCurrentConversationId] = useState<
    number | string | null
  >(null);


  const [messagesIsLoading, setMessagesIsLoading] = useState<null | boolean>(
    null
  );

  // Update session storage whenever userName or splitUserName changes
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
      userName: "",
      splitUserName,
    });
  }, [status]);

  useEffect(() => {
    if (session && session.user && session.user.id) {
      // console.log("Current user ID:", session.user.id);
      setUserId(session.user.id);
    } else {
      console.log("No user ID available in session");
    }
  }, [session])

  //Stores the Chat
  const {
    responses,
    setResponses,
    message,
    setMessage,
    isFetchLoading,
    setIsFetchLoading,
  } = useChatConversation();

  const { conversations, isLoading, setConversations } = useConversations(
    session as Session
  );

  const {
    createConversation,
    newTitle,
    setNewTitle,
    isCreateLoading,
    error,
    dataId,
  } = useCreateConversation(
    session as Session,
    setConversations as any,
    setCurrentConversationId
  );

  //This function shifts and shows the mobile Chat ccontainer
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAtZero, setIsAtZero] = useState<boolean>(false); // State to track the position

  const handleMobileChatBtnClick = () => {
    console.log(
      "Logging the chat container Ref current state",
      chatContainerRef.current
    );

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

  // Clear the conversation ID on component mount
  useEffect(() => {
    //Removed the border Classes From LocalStorage
    localStorage.removeItem("borderClasses");
    localStorage.removeItem("currentQuestion");

    // console.log("clearing the current conversation ID");
    setResponses([]);
    setCurrentConversationId(null);
  }, []);

  // Update session storage whenever userName or splitUserName changes
  useEffect(() => {
    if (isClient()) {
      sessionStorage.removeItem("greetingSent");
      sessionStorage.removeItem("currentConvoId");
      if (userName !== null) {
        sessionStorage.setItem("userName", userName);
      }

      if (splitUserName !== "") {
        sessionStorage.setItem("splitUserName", splitUserName);
      }

      if (email !== null) {
        sessionStorage.setItem("email", email);
      }
    }
  }, [userName, splitUserName]);

  // Update session storage whenever userName or splitUserName changes

  const sessionRef = useRef(0);
  useEffect(() => {
    // console.log(
    //   "useEffect: Checking to see if the session ref changed",
    //   sessionRef.current
    // );
  }, [sessionRef]);

  //Submit the Inquiry
  const chatDashBoardRef = useRef<HTMLDivElement>(null);
    // Check for special commands
    const specialCommands = {
      'br': '/br',
      'down': '/down',
      'help': '/help',
      'listbr': '/listbr',
      'new': '/new',
      'pdf': '/pdf',
      'rem': '/rem',
      'save': '/save',
      'see': '/see',
      'size': '/size',
      'support': '/support',
      'up': '/up',
      'usage': '/usage',
      'v': '/v',
      'vec': '/vectorimage',
      'ycai': '/ycai'
    };


    const [pdfImages, setPdfImages] = useState<string[]>([]);
    const [selectedPdfImage, setSelectedPdfImage] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
  
      if (!message.trim()) {
        console.log("Empty message, returning");
        return;
      }
  
      setMessagesIsLoading(true);
      console.log("Messages is loading", messagesIsLoading);
  
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
        return;
      }
  
      if (command === "$pdf") {
  
     
        uploadImage(selectedPdfImage as string);
  
        return
      }
  
  
      async function uploadImage(imagePath: string) {
        // Fetch the image as a Blob
        const response = await fetch(imagePath);
        const blob = await response.blob(); // Convert the response to a Blob
        const file = new File([blob], "image.png", { type: blob.type }); // Create a File object
      
        const formData = new FormData();
        formData.append('file', file); // Change 'files' to 'file'
        
        console.log("Logging the image file", file);
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
        await handleSpecialCommand(command, message);
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
                'Origin': 'http://localhost:3000'  // Adjust if your frontend runs on a different port
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
            setMessagesIsLoading(false);
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
  const handleSpecialCommand = async (command: string, fullMessage: string) => {
    const baseUrl = 'http://127.0.0.1:5000'; // Adjust this to your API base URL
    const commandEndpoint = `${baseUrl}${specialCommands[command as keyof typeof specialCommands]}`;

    console.log("Command Endpoint:", commandEndpoint);
    window.alert(commandEndpoint);

    return

    try {
      const response = await fetch(commandEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session?.user.id,
          message: fullMessage,
          conversationId: currentConversationId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`Command ${command} response:`, data);

      // Update UI with command response
      setResponses(prevResponses => [
        ...prevResponses,
        { question: fullMessage, response: data.response, id: Date.now().toString() }
      ]);

    } catch (error) {
      console.error(`Error executing command ${command}:`, error);
      // Update UI with error message
      setResponses(prevResponses => [
        ...prevResponses,
        { question: fullMessage, response: `Error executing command: ${error instanceof Error ? error.message : 'Unknown error'}`, id: Date.now().toString() }
      ]);
    } finally {
      setMessagesIsLoading(false);
    }
  };

  useEffect(() => {}, [messagesIsLoading]);

  // Where we are going to send the Chat Data Request

  function updateLocalStorage(
    updatedConversation: any,
    conversationId: number
  ) {
    if (isClient()) {
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

            sessionStorage.setItem(
              "conversations",
              JSON.stringify(updatedCache)
            );

            // console.log("Logging the updated Cache", updatedCache);
          } else {
            console.error("Parsed cached conversations is not an array");
          }
        } catch (e) {
          console.error("Error parsing cached conversations:", e);
        }
      }
    }
  }

  useEffect(() => {}, []);

  async function getConversation(conversationId: any) {
    // console.log(
    //   "Logging the converatation ID in the getConversation",
    //   conversationId
    // );
    try {
      const response = await fetch(`/api/${conversationId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch conversation");
      }

      const updatedConversation = await response.json();
      console.log(
        "Logging the converations before errorw",
        updatedConversation
      );
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
      throw error; // Re-throw to handle it in the UI layeclearr
    }
  }
  const handleSubmitTitle = async (event: any) => {
    event.preventDefault(); // Prevent form submission
    let titleChange: string = "";


    return;
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
        await getConversation(editTitleId);
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
  //Gets the key down change
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmitTitle(event as any); // Cast to any to satisfy FormEvent type
    }
  };

  //Editing the ability to change the existing title.
  const handleTitleClick = (convoId: string) => {
    const conversation = conversations.find(
      (convo) => (convo as any).conversationId === convoId
    );

    if (conversation) {
      setEditTitleId((conversation as any).conversationId);
      setEditedTitle((conversation as any).title);
      setEditingTitle(true as boolean);
    } else {
    }
  };
  useEffect(() => {}, [editTitleId, editedTitle]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  // Logging the responses temp
  useEffect(() => {}, [responses]);

  // sessionStorage.clear();

  const handleConversationClick = (convoId: string) => {
    // console.log("Activating conversation with ID:", convoId);
    localStorage.setItem("currentConversationId", convoId);
    sessionStorage.setItem("currentConversationId", convoId);
    console.log("Logging the convoId", convoId)


    const targetPath = `/ai/chat/${session?.user.id}/${convoId}`;

    console.log("Logging the target path", targetPath)


    router.push(targetPath, undefined);

    setCurrentConversationId(convoId);
  };

  //Lets clear the chat Responses when we first load in
  // Function to remove the first index of chatResponses
  const removeFirstChatResponse = () => {
    if (isClient()) {
      const chatResponses = JSON.parse(
        sessionStorage.getItem("chatResponses") || "[]"
      );
      if (chatResponses.length > 0) {
        chatResponses.shift(); // Remove the first element
        sessionStorage.setItem("chatResponses", JSON.stringify(chatResponses));
        console.log("First chat response removed");
      } else {
        // console.log("No chat responses to remove");
      }
    }
  };

  useEffect(() => {
    removeFirstChatResponse();
  }, [pathname]);

  //This function Deletes the cvonersation
  async function deleteConversation(conversationId: string) {
    if (isClient()) {
      const currentConversations = conversations;

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

        console.log(
          "Local storage after deletion:",
          sessionStorage.getItem("conversations")
        );

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
        console.error("Error deleting conversation:", (error as Error).message);
        alert("Could not delete the conversation. Please try again.");
      }
    }
  }

  //Send an automated Message on load

  const handleCardClick = (text: string) => {
    setMessage(text);
  };

  const handleButtonClick = (event: any) => {
    const buttonElement = event.target as HTMLElement;
    const cardElement = buttonElement.closest("div");
    const text = cardElement?.querySelector("p")?.textContent || "";
    handleCardClick(text);
  };

  useEffect(() => {
    // console.log("Current message:", message);
  }, [message]);

  //Get access to the current conversation Name and Id

  useEffect(() => {
    // console.log("Loggin the conversations in the app useEffect", conversations);
  }, [conversations]);

  //This handles the closing of the chat function
  const [chatContainerShown, setChatContainerShown] = useState<boolean>(false);
  const chatContainerToggle = () => {
    // console.log("IS this being clicked??? Showon yes or no");
    setChatContainerShown(!chatContainerShown);
  };



  // const { loading } = useSessionGate();


  // if (loading) {
  //   return (
  //     <div className="h-[100vh] w-full flex items-center justify-center">

  //         {/* <LoadingComponent /> */}

  //     </div>
  //   );


  // }



  return (
    <MessageProvider>
      {showGuidelines && <Guidelines onComplete={handleGuidelinesComplete} />}

      <div className="chatDashboard text-white">
        {/* Chat Container Componet  */}

        <ChatContainer
          setConversations={setConversations}
          conversations={conversations}
          currentConversationId = {currentConversationId}
          splitUserName={splitUserName}
          userName={userName || ""}
          email={email || ""}
          onConversationClick={handleConversationClick}
          onDeleteConvo={(convoId: string | number) => deleteConversation(convoId.toString())}
          onChangeConvoTitle={handleSubmitTitle}
          handleTitleClick={handleTitleClick}
          editTitleId={editTitleId}
          editedTitle={editedTitle}
          handleTitleChange={handleTitleChange}
          editingTitle={editingTitle}
          setEditingTitle={setEditingTitle}
          titleUpdated={titleUpdated}
          handleKeyDown={handleKeyDown}
          chatContainerRef={chatContainerRef as any}
          handleMobileChatBtnClick={handleMobileChatBtnClick}
          chatContainerToggle={chatContainerToggle}
          chatContainerShown={chatContainerShown}
        />

        {/* Chat Container Componet  */}

        <div
          ref={chatDashBoardRef}
          className="chatDashboardWrapper w-full text-left"
        >
       

          <div className="chatDashBoardContainer">
            {/* Dashboard Component  */}
            {currentConversationId ? (
              <ChatMessagesContainer responses={responses || "null"} />
            ) : (
              <Dashboard
                userName={userName || ""}
                handleButtonClick={handleButtonClick}
                formRef = {formRef}
                isResponseLoading = {messagesIsLoading || false}
                handleSubmit= {handleSubmit}
                setMessage = {setMessage}
                message = {message}


              />
            )}

{currentConversationId ? (

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="chatFormSubmit"
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
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleSelectFile}
                    ref={(ref) => {
                      uploadInput = ref;
                    }}                  />
                  <button className="textAreaIcon" onClick={() => document.getElementById('fileInput')?.click()}>
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
              {selectedFile && <div className="mt-2">Selected file: {selectedFile.name}</div>}
            </form>
            ) : null}
          </div>
        </div>
      </div>
    </MessageProvider>
  );
};

export default dynamic(() => Promise.resolve(ChatDashboard), { ssr: false });
