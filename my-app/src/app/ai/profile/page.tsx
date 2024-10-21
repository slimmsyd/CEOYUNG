"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/navigation";
import React, {
  useState,
  useEffect,
  useRef,
  use,
  useId,
  FormEvent,
} from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { Session } from "next-auth";


//Utilis and helper functions
import { isClient } from "@/utilis/isClient";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { checkSession } from "@/utilis/CheckSession";

// import { Header } from "@/app/components/Header";
// Dashboard

import { useChatConversation } from "@/hooks/ConversationContext";
import useCreateConversation from "@/hooks/createConversation";
import useConversations from "@/hooks/useConversations";
//Chat Container
import { ChatContainer } from "../chat/ChatContainer";

import axios from "axios";

// import FloatingScrollButton from "@/app/components/ScrollToBottomButton";
// import OpenChatContainer from "@/app/components/helper/openChatContainerComponent";
// import { useSessionGate } from "@/app/profile/_middlewhere";
// import LoadingComponent from "@/app/components/helper/Loading";
export default function Profile() {



  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  //Should wrap these in a bigger function since being used multiple times?

  const [sessionStatus, setSessionStatus] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [showGuidelines, setShowGuidelines] = useState(true);


  //List of  PDF imagse

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

  let localStorageConvoId: any;

  useEffect(() => {
    if (localStorage.getItem("currentConversationId")) {
      localStorageConvoId = localStorage.getItem("currentConversationId");
      setCurrentConversationId(localStorageConvoId);
    }
  }, []);

  const { data: session, status } = useSession();



  //Set the conversation
  const [currentConversationId, setCurrentConversationId] = useState<
    number | string | null
  >(null);

  // const [newTitle, setNewTitle] = useState("");

  const { conversations, isLoading, setConversations } = useConversations(
    session as any
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
      // handleConversationClick(currentConversationId as string);
    }
    clearStorage();
  }, [currentConversationId]); // Dependency array includes state that triggers this effect

  useEffect(() => {}, [isLoading]);



  //Fetch Message for this converations
  const messagesRefCounter = useRef(0);
  useEffect(() => {}, [messagesRefCounter]);



  if (!conversations) {
    return <p>No conversation found.</p>;
  }


;

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
     

        <div className={`chatDashBoardContainer `}>

          <div className="flex flex-col gap-[15px] space-y-4 my-[5rem]" >

            <div className = "flex flex-col gap-[15px]">
              <h2>Account</h2>
            <div className="border border-gray-700 rounded-lg p-4">

              <div className = "flex flex-col gap-[15px]">  
                <p>Profile</p>
                  <div className = "flex flex-col gap-[20px] text-sm">  
                    <div className = "flex flex-col gap-[5px]">
                      <p>Name</p>
                      <p className = "text-gray-400">{userName}</p>
                    </div>
                    <div className = "flex flex-col gap-[5px]">
                      <p>Email</p>
                      <p className = "text-gray-400">@{email}</p>
                    </div>
                  </div>
                </div>
                
                <button 
            className=" mt-4 hidden md:flex text-white px-4 py-2 rounded-md   hover:border-white transition-colors"

            onClick={() => signOut()}>Sign Out </button>
              </div>

            </div>

         
            {/* <div className = "flex flex-col gap-[15px]">
            <div className="border border-gray-700 rounded-lg p-4">
              </div>
            </div> */}
           
            {/* <div className = "flex flex-col gap-[15px]">
            <div className="border border-gray-700 rounded-lg p-4">
              </div>

              
            </div> */}


            
          </div>
       

        </div>
      </div>
    </div>
  );
}
