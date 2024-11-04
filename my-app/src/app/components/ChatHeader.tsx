import Link from "next/link";
import { useEffect, useState } from "react";

import { Conversation } from "../../../types";

interface ChatHeaderProps { 
  conversations?: Conversation[];
}

export default function ChatHeader({conversations}: ChatHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentConvoId, setCurrentConvoId] = useState<string>('');
  const [currentConvoName, setCurrentConvoName] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    // Get current URL path
    const path = window.location.pathname;
    // Extract conversation ID from path (last segment)
    const id = path.split('/').pop() || '';
    console.log("Current conversation ID", id)
    if (conversations) {
      const conversation = conversations.find((convo) => convo.conversationId === id);
      setCurrentConvoId(id);
      setCurrentConvoName(conversation?.title || '');
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    console.log("Is Editing", isEditing)

  },[isEditing])
  const handleTitleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    
    if (e.key === 'Escape') {
      // Cancel editing and reset to original title
      setIsEditing(false);
      setEditedTitle(currentConvoName);
      return;
    }
    if (e.key === 'Enter') {
      try {
        const response = await fetch('/api/renameTitle', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: currentConvoId,
            title: editedTitle,
          }),
        });

        if (response.ok) {
          setCurrentConvoName(editedTitle);
          setIsEditing(false);
          window.alert('Title updated successfully!');
        } else {
          window.alert('Failed to update title');
        }
      } catch (error) {
        window.alert('Error updating title');
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
        <Link href="/ai/chat" className="bg-[rgba(39,60,110,0.1)] hover:bg-[rgba(39,60,110,0.39)] text-[14px] border-[1px] border-[rgb(39,60,110)] transition-colors duration-200 px-4 py-2 rounded-md cursor-pointer">
          Dashboard
        </Link>
      </div>

      {/* Fixed header */}
      <div
        className={`fixed z-10 top-0 left-0 right-0 flex flex-row w-[100%] px-[10px] py-[20px] h-[50px] gap-[10px] items-center justify-end text-white border border-[#807f7f57] bg-[#1a1a1a] transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
        <Link href="/ai/chat" className="bg-[rgba(39,60,110,0.1)] hover:bg-[rgba(39,60,110,0.39)] text-[14px] border-[1px] border-[rgb(39,60,110)] transition-colors duration-200 px-4 py-2 rounded-md cursor-pointer">
          Dashboard
        </Link>
      </div>
    </>
  );
}
