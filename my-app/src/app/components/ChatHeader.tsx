import Link from "next/link";
import { useEffect, useState } from "react";

import { Conversation } from "../../../types";

interface ChatHeaderProps {
  conversations?: Conversation[];
  deleteConversation: (id: string) => void;
}

export default function ChatHeader({ conversations, deleteConversation }: ChatHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentConvoId, setCurrentConvoId] = useState<string>("");
  const [currentConvoName, setCurrentConvoName] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    // Get current URL path
    const path = window.location.pathname;
    // Extract conversation ID from path (last segment)
    const id = path.split("/").pop() || "";
    console.log("Current conversation ID", id);
    if (conversations) {
      const conversation = conversations.find(
        (convo) => convo.conversationId === id
      );
      setCurrentConvoId(id);
      setCurrentConvoName(conversation?.title || "");
    }
  }, [conversations]);

  useEffect(() => {
    const handleScroll = () => {
      const originalHeader = document.querySelector('[data-header="original"]');
      if (originalHeader) {
        const headerPosition = originalHeader.getBoundingClientRect().top;
        const scrollPosition = window.scrollY;
        setIsScrolled(headerPosition < 0 && scrollPosition > 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTitleClick = () => {
    console.log("Title clicked, setting isEditing to true");
    setIsEditing(true);
    setEditedTitle(currentConvoName);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Title changing to:", e.target.value);
    setEditedTitle(e.target.value);
  };

  useEffect(() => {
    console.log("Is Editing", isEditing);
  }, [isEditing]);
  const handleTitleSubmit = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Escape") {
      // Cancel editing and reset to original title
      setIsEditing(false);
      setEditedTitle(currentConvoName);
      return;
    }
    if (e.key === "Enter") {
      try {
        const response = await fetch("/api/renameTitle", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: currentConvoId,
            title: editedTitle,
          }),
        });

        if (response.ok) {
          setCurrentConvoName(editedTitle);
          setIsEditing(false);
          window.alert("Title updated successfully!");
        } else {
          window.alert("Failed to update title");
        }
      } catch (error) {
        window.alert("Error updating title");
      }
    }
  };

  return (
    <>
      {/* Original header */}
      <div
        data-header="original"
        className="flex flex-row w-[100%] px-[10px] py-[20px] h-[50px] gap-[10px] items-center justify-end text-white border-b border-[#807f7f57]"
      >
        <div className="flex-grow text-left">
          {isEditing ? (
            <input
              type="text"
              value={`${editedTitle}`}
              onChange={handleTitleChange}
              onKeyDown={handleTitleSubmit}
              // onBlur={handleTitleBlur}
              className="bg-transparent border-be text-[14px] outline-none w-[300px]"
              autoFocus
              onClick={(e) => e.stopPropagation()} // Prevent click from bubbling
            />
          ) : (
            <h3
              className="text-[14px] cursor-pointer hover:text-gray-300"
              onClick={handleTitleClick}
            >
              Current Conversation: {currentConvoName}
            </h3>
          )}
        </div>

        <div className="inline-flex items-center gap-[10px]">
          <svg
          onClick={() => deleteConversation(currentConvoId)}
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="trash"
            className="svg-inline--fa fa-trash fa-fw !cursor-pointer "
            role="img"
            width="20px"
            height="20px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M177.1 48h93.7c2.7 0 5.2 1.3 6.7 3.6l19 28.4h-145l19-28.4c1.5-2.2 4-3.6 6.7-3.6zM354.2 80L317.5 24.9C307.1 9.4 289.6 0 270.9 0H177.1c-18.7 0-36.2 9.4-46.6 24.9L93.8 80H80.1 32 24C10.7 80 0 90.7 0 104s10.7 24 24 24H35.6L59.6 452.7c2.5 33.4 30.3 59.3 63.8 59.3H324.6c33.5 0 61.3-25.9 63.8-59.3L412.4 128H424c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8H367.9 354.2zm10.1 48L340.5 449.2c-.6 8.4-7.6 14.8-16 14.8H123.4c-8.4 0-15.3-6.5-16-14.8L83.7 128H364.3z"
            ></path>
          </svg>
          <Link
            href="/ai/chat"
            className="bg-[rgba(39,60,110,0.1)] hover:bg-[rgba(39,60,110,0.39)] text-[14px] border-[1px] border-[rgb(39,60,110)] transition-colors duration-200 px-4 py-2 rounded-md cursor-pointer"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Fixed header */}
      <div
        className={`fixed z-10 top-0 left-0 right-0 flex flex-row w-[100%] px-[10px] py-[20px] h-[50px] gap-[10px] items-center justify-end text-white border border-[#807f7f57] bg-[#1a1a1a] transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex-grow text-left">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              onKeyDown={handleTitleSubmit}
              // onBlur={handleTitleBlur}
              className="bg-transparent border-b border-white text-[14px] outline-none w-[300px]"
              autoFocus
              onClick={(e) => e.stopPropagation()} // Prevent click from bubbling
            />
          ) : (
            <h3
              className="text-[14px] cursor-pointer hover:text-gray-300"
              onClick={handleTitleClick}
            >
              Current Conversation: {currentConvoName}
            </h3>
          )}
        </div>
    
        <div className="inline-flex items-center gap-[10px]">
          <svg
            onClick={() => deleteConversation(currentConvoId)}
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="trash"
              className="svg-inline--fa fa-trash fa-fw !cursor-pointer "
            role="img"
            width="20px"
            height="20px"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M177.1 48h93.7c2.7 0 5.2 1.3 6.7 3.6l19 28.4h-145l19-28.4c1.5-2.2 4-3.6 6.7-3.6zM354.2 80L317.5 24.9C307.1 9.4 289.6 0 270.9 0H177.1c-18.7 0-36.2 9.4-46.6 24.9L93.8 80H80.1 32 24C10.7 80 0 90.7 0 104s10.7 24 24 24H35.6L59.6 452.7c2.5 33.4 30.3 59.3 63.8 59.3H324.6c33.5 0 61.3-25.9 63.8-59.3L412.4 128H424c13.3 0 24-10.7 24-24s-10.7-24-24-24h-8H367.9 354.2zm10.1 48L340.5 449.2c-.6 8.4-7.6 14.8-16 14.8H123.4c-8.4 0-15.3-6.5-16-14.8L83.7 128H364.3z"
            ></path>
          </svg>
          <Link
            href="/ai/chat"
            className="bg-[rgba(39,60,110,0.1)] hover:bg-[rgba(39,60,110,0.39)] text-[14px] border-[1px] border-[rgb(39,60,110)] transition-colors duration-200 px-4 py-2 rounded-md cursor-pointer"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </>
  );
}
