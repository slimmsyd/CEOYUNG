import { FormEvent, useEffect, useRef, useState } from "react";
import React, { FC, RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import { Conversation } from "../../../../types";

// import { isClient } from "@/utilis/isClient";

interface ChatContainerProps {
  setConversations?: React.Dispatch<React.SetStateAction<Conversation[]>>;
  conversations?: Conversation[];
  currentConversationId: string | null | number;
  splitUserName: string;
  userName: string;
  email?: string;
  onConversationClick?: (convoId: string) => void;
  onDeleteConvo?: (convoId: number | string) => void;
  onChangeConvoTitle?: (event: any) => void;
  handleTitleClick?: (event: any) => void;
  handleTitleChange?: (event: any) => void;
  editTitleId?: null;
  editedTitle?: string;
  editingTitle?: boolean;
  setEditingTitle?: React.Dispatch<React.SetStateAction<boolean>>;
  titleUpdated?: boolean;
  handleKeyDown?: (event: any) => void;
  chatContainerRef?: React.Ref<HTMLDivElement>;
  handleMobileChatBtnClick?: () => void;
  chatContainerToggle?: () => void;
  chatContainerShown?: boolean;
}

export const ChatContainer: FC<ChatContainerProps> = ({
  setConversations,
  conversations,
  currentConversationId,
  splitUserName,
  userName,
  email,
  onConversationClick,
  onDeleteConvo,
  onChangeConvoTitle,
  handleTitleClick,
  editTitleId,
  editedTitle,
  handleTitleChange,
  editingTitle,
  setEditingTitle,
  titleUpdated,
  handleKeyDown,
  chatContainerRef,
  handleMobileChatBtnClick,
  chatContainerToggle,
  chatContainerShown,
}) => {
  //Controlling hte hover state of the Delete SVG
  const [hoveredConversationId, setHoveredConversationId] = useState<
    null | string
  >(null);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [showDeleteContainer, setShowDeleteContainer] =
    useState<boolean>(false);
  useState<boolean>(false);
  const deleteContainerRef = useRef<HTMLDivElement>(null);
  const editingTitleRef = useRef<HTMLButtonElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      deleteContainerRef.current &&
      !deleteContainerRef.current.contains(event.target as Node)
    ) {
      setShowDeleteContainer(false);
    }
  };
  const handleOutsideClickTitleBtn = (event: MouseEvent) => {
    if (
      editingTitleRef.current &&
      !editingTitleRef.current.contains(event.target as Node)
    ) {
      setEditingTitle?.(false);
    }
  };

  useEffect(() => {}, [editTitleId, editedTitle, editingTitle]);

  useEffect(() => {
    if (showDeleteContainer) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showDeleteContainer]);

  useEffect(() => {
    if (editingTitleRef) {
      document.addEventListener("mousedown", handleOutsideClickTitleBtn);
    } else {
      document.removeEventListener("mousedown", handleOutsideClickTitleBtn);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClickTitleBtn);
    };
  }, [editingTitleRef]);

  //Checking hte hover VOneration ID
  useEffect(() => {}, [hoveredConversationId]);

  //Want to get access to the conversatiosn and display in local chat
  useEffect(() => {
    // Retrieve the conversations from local storage
    const localStorageConversations = sessionStorage.getItem("conversations");

    // Set loading to true initially
    setLoading(true);

    if (localStorageConversations) {
      // Parse the conversations from local storage
      const conversationArray: Conversation[] = JSON.parse(
        localStorageConversations
      );
      // Set the conversations state
      setConversations?.(conversationArray);
      // Set loading to false
      setLoading(false);
    } else {
      // If no conversations found, still set loading to false
      setLoading(false);
    }

    // Log isLoading after a render cycle
  }, [titleUpdated, isLoading]);

  useEffect(() => {}, [isLoading]);

  const [clientSplitUserName, setClientSplitUserName] =
    useState<string>(splitUserName);
  const [clientEmail, setClientEmail] = useState<string>(email as any);

  const getSessionStorageItem = (key: string, defaultValue: string) => {
    if (typeof window !== "undefined" && sessionStorage) {
      return sessionStorage.getItem(key) || defaultValue;
    }
    return defaultValue;
  };

  useEffect(() => {
    setClientSplitUserName(
      getSessionStorageItem("splitUserName", splitUserName)
    );

    setClientEmail(getSessionStorageItem("email", email as any));
  }, [splitUserName, email]);

  useEffect(() => {}, [chatContainerShown]);

  useEffect(() => {
    // console.log("Conversations", conversations);

  }, [conversations]);

  // Add placeholder conversations

  const [isHovered, setIsHovered] = useState(false);

  // Add these helper functions before the return statement
  const isToday = (date: string) => {
    const today = new Date();
    const compareDate = new Date(date);
    return (
      compareDate.getDate() === today.getDate() &&
      compareDate.getMonth() === today.getMonth() &&
      compareDate.getFullYear() === today.getFullYear()
    );
  };

  // Group conversations
  const groupedConversations = conversations?.reduce(
    (groups, conversation) => {
      if (conversation.createdAt && isToday(conversation.createdAt.toString())) {
        groups.today.push(conversation);
      } else if (conversation.createdAt) {
        groups.recent.push(conversation);
      }
      return groups;
    },
    { today: [], recent: [] } as { today: Conversation[]; recent: Conversation[] }
  ) || { today: [], recent: [] };

  return (
    <div
      ref={chatContainerRef}
      className={`chatContainer flex flex-col flex-1 hover:min-w-[200px] ${
        chatContainerShown ? "none" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col gap-[22px]  h-full">
        {" "}
        <Link href="/" className="flex flex-row items-start">
          {/* <Image src={FaceIcon} width={24} height={24} alt="Face Icon" /> */}
        </Link>
        <div className="flex flex-col gap-[13px] items-start justify-start h-[150px]">
          <div className="flex flex-row gap-[13px] items-center justify-start">
            <div>
              <svg
                role="img"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="white"
                stroke-width="1.8"
                stroke="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <title></title>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.315 5.49313C16.5616 4.83562 15.4384 4.83562 14.685 5.49313L6.02743 13.0485C5.37462 13.6183 5 14.4424 5 15.3089L5 23.6727C5 25.8819 6.79086 27.6727 9 27.6727L23 27.6727C25.2091 27.6727 27 25.8819 27 23.6727V15.3089C27 14.4424 26.6254 13.6183 25.9726 13.0485L17.315 5.49313ZM14.4472 21.7783C13.9532 21.5313 13.3525 21.7315 13.1055 22.2255C12.8586 22.7195 13.0588 23.3201 13.5528 23.5671C15.0933 24.3374 16.9067 24.3374 18.4472 23.5671C18.9412 23.3201 19.1414 22.7195 18.8944 22.2255C18.6474 21.7315 18.0468 21.5313 17.5528 21.7783C16.5753 22.267 15.4247 22.267 14.4472 21.7783Z"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
            </div>

            <Link href="/">Yung AI</Link>
          </div>
          <div
            onClick={handleMobileChatBtnClick}
            className=" mobileChatBtn !relative flex items-center justify-start"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M112,60a16,16,0,1,1,16,16A16,16,0,0,1,112,60Zm16,52a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,68a16,16,0,1,0,16,16A16,16,0,0,0,128,180Z"></path>
            </svg>
          </div>

          <div className="flex flex-row gap-[13px]">
            <div
            
            >
              <svg
                role="img"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                stroke-width="2"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <title></title>
                  <path d="M8.5 25.5C9.5 24.5 9.83333 22.3333 9.5 21.5C9.42273 21.4734 8.84545 21.2538 8.76817 21.2262C7.66999 20.8332 7 19.7542 7 18.5879V9.87424C7 8.72745 7.64925 7.6677 8.73365 7.2946C12.2079 6.09927 18.2029 5.11688 24.2305 7.27337C25.3287 7.66627 26 8.74577 26 9.91214V18.6258C26 19.7726 25.3496 20.8328 24.2652 21.2058C21.9099 22.016 18.3965 22.7282 14.5 22.4312C13.5 24.4312 11 25.5 8.5 25.5Z"></path>
                </g>
              </svg>
            </div>

            <Link href="/ai/chat">Chats</Link>
          </div>
        </div>
        {/* Chat ICON layered right here  */}
        <div className="chatRenderWrapper relative flex flex-col items-start justify-start gap-[13px] w-full">
          {/* Clear all Chats Div */}
          <div className="absolute w-[10px] h-[10px] left-[-20px] cursor-pointer	 "></div>

          <div className="flex flex-col gap-[13px] overflow-scroll w-[95%] chatScrollbar">
            {isLoading ? null : (
              <>
                {groupedConversations.today.length > 0 && (
                  <>
                    <p className="text-gray-400 text-sm px-2">Today</p>
                    {groupedConversations.today.map((conversation) => (
                      <div key={conversation.conversationId} className="relative">
                        <span
                          ref={editingTitleRef}
                          onMouseEnter={() =>
                            setHoveredConversationId(conversation.conversationId)
                          }
                          className="flex  flex-row  gap-[13px] ite           ms-start justify-start w-full"
                        >
                          {editTitleId === (conversation as any).conversationId &&
                          editingTitle === true ? (
                            <form
                              onSubmit={onChangeConvoTitle}
                              className="flex flex-row justify-center items-center gap-3"
                            >
                              <input
                                className="chatMessageContainer"
                                type="text"
                                value={editedTitle}
                                onChange={handleTitleChange}
                                disabled={editTitleId === null}
                                onKeyDown={handleKeyDown}
                              />
                            </form>
                          ) : (
                            <div className="flex flex-row justify-between items-center w-full pr-[5px]">
                              <div className="flex flex-col px-2 py-1">
                                <p
                                  onClick={() => {
                                    if (!editingTitle) {
                                    onConversationClick &&
                                      onConversationClick(
                                        conversation.conversationId
                                            );
                                    }
                                  }}
                                className={`transition-all duration-300  text-left cursor-pointer ${
                                  conversation.conversationId ===
                                  currentConversationId
                                    ? "text-[#ffff] bg-[#545454] rounded-md  border border-white border-opacity-50"
                                    : hoveredConversationId ===
                                      conversation.conversationId
                                    ? "text-[#8c8c8c]"
                                    : "text-[#ffffff]"
                                } ${isHovered ? "opacity-100" : "opacity-0"}`}
                              >
                                {conversation.title}
                              </p>
                            </div>
                            {hoveredConversationId ===
                              conversation.conversationId && (
                                <svg
                                  width={15}
                                  height={15}
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="far"
                                  data-icon="layer-group"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 576 512"
                                  className="ml-2"
                                  onMouseDown={() => setShowDeleteContainer(true)}
                                >
                                  <path
                                    fill="currentColor"
                                    d="M288 0c-8.5 0-17 1.7-24.8 5.1L53.9 94.8C40.6 100.5 32 113.5 32 128s8.6 27.5 21.9 33.2l209.3 89.7c7.8 3.4 16.3 5.1 24.8 5.1s17-1.7 24.8-5.1l209.3-89.7c13.3-5.7 21.9-18.8 21.9-33.2s-8.6-27.5-21.9-33.2L312.8 5.1C305 1.7 296.5 0 288 0zm-5.9 49.2C284 48.4 286 48 288 48s4 .4 5.9 1.2L477.7 128 293.9 206.8c-1.9 .8-3.9 1.2-5.9 1.2s-4-.4-5.9-1.2L98.3 128 282.1 49.2zM53.9 222.8C40.6 228.5 32 241.5 32 256s8.6 27.5 21.9 33.2l209.3 89.7c7.8 3.4 16.3 5.1 24.8 5.1s17-1.7 24.8-5.1l209.3-89.7c13.3-5.7 21.9-18.8 21.9-33.2s-8.6-27.5-21.9-33.2l-31.2-13.4L430 235.5 477.7 256 293.9 334.8c-1.9 .8-3.9 1.2-5.9 1.2s-4-.4-5.9-1.2L98.3 256 146 235.5 85.1 209.4 53.9 222.8zm0 128C40.6 356.5 32 369.5 32 384s8.6 27.5 21.9 33.2l209.3 89.7c7.8 3.4 16.3 5.1 24.8 5.1s17-1.7 24.8-5.1l209.3-89.7c13.3-5.7 21.9-18.8 21.9-33.2s-8.6-27.5-21.9-33.2l-31.2-13.4L430 363.5 477.7 384 293.9 462.8c-1.9 .8-3.9 1.2-5.9 1.2s-4-.4-5.9-1.2L98.3 384 146 363.5 85.1 337.4 53.9 350.8z"
                                  ></path>
                                </svg>
                              )}
                            </div>
                          )}
                        </span>
                      </div>
                    ))}
                  </>
                )}
                
                {groupedConversations.recent.length > 0 && (
                  <>
                    <p className={`text-gray-400 text-sm px-2 ${isHovered ? "opacity-100" : "opacity-0"}`}>Recent</p>
                    {groupedConversations.recent.map((conversation) => (
                      <div key={conversation.conversationId} className="relative">
                        <span
                          ref={editingTitleRef}
                          onMouseEnter={() =>
                            setHoveredConversationId(conversation.conversationId)
                          }
                          className="flex  flex-row  gap-[13px] ite           ms-start justify-start w-full"
                        >
                          {editTitleId === (conversation as any).conversationId &&
                          editingTitle === true ? (
                            <form
                              onSubmit={onChangeConvoTitle}
                              className="flex flex-row justify-center items-center gap-3"
                            >
                              <input
                                className="chatMessageContainer"
                                type="text"
                                value={editedTitle}
                                onChange={handleTitleChange}
                                disabled={editTitleId === null}
                                onKeyDown={handleKeyDown}
                              />
                            </form>
                          ) : (
                            <div className="flex flex-row justify-between items-center w-full pr-[5px]">
                              <div className="flex flex-col px-2 py-1">
                                <p
                                  onClick={() => {
                                    if (!editingTitle) {
                                    onConversationClick &&
                                      onConversationClick(
                                        conversation.conversationId
                                            );
                                    }
                                  }}
                                className={`transition-all duration-300  text-left cursor-pointer ${
                                  conversation.conversationId ===
                                  currentConversationId
                                    ? "text-[#ffff] bg-[#545454] rounded-md  border border-white border-opacity-50"
                                    : hoveredConversationId ===
                                      conversation.conversationId
                                    ? "text-[#8c8c8c]"
                                    : "text-[#ffffff]"
                                } ${isHovered ? "opacity-100" : "opacity-0"}`}
                              >
                                {conversation.title}
                              </p>
                            </div>
                            {hoveredConversationId ===
                              conversation.conversationId && (
                                <svg
                                  width={15}
                                  height={15}
                                  aria-hidden="true"
                                  focusable="false"
                                  data-prefix="far"
                                  data-icon="layer-group"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 576 512"
                                  className="ml-2"
                                  onMouseDown={() => setShowDeleteContainer(true)}
                                >
                                  <path
                                    fill="currentColor"
                                    d="M288 0c-8.5 0-17 1.7-24.8 5.1L53.9 94.8C40.6 100.5 32 113.5 32 128s8.6 27.5 21.9 33.2l209.3 89.7c7.8 3.4 16.3 5.1 24.8 5.1s17-1.7 24.8-5.1l209.3-89.7c13.3-5.7 21.9-18.8 21.9-33.2s-8.6-27.5-21.9-33.2L312.8 5.1C305 1.7 296.5 0 288 0zm-5.9 49.2C284 48.4 286 48 288 48s4 .4 5.9 1.2L477.7 128 293.9 206.8c-1.9 .8-3.9 1.2-5.9 1.2s-4-.4-5.9-1.2L98.3 128 282.1 49.2zM53.9 222.8C40.6 228.5 32 241.5 32 256s8.6 27.5 21.9 33.2l209.3 89.7c7.8 3.4 16.3 5.1 24.8 5.1s17-1.7 24.8-5.1l209.3-89.7c13.3-5.7 21.9-18.8 21.9-33.2s-8.6-27.5-21.9-33.2l-31.2-13.4L430 235.5 477.7 256 293.9 334.8c-1.9 .8-3.9 1.2-5.9 1.2s-4-.4-5.9-1.2L98.3 256 146 235.5 85.1 209.4 53.9 222.8zm0 128C40.6 356.5 32 369.5 32 384s8.6 27.5 21.9 33.2l209.3 89.7c7.8 3.4 16.3 5.1 24.8 5.1s17-1.7 24.8-5.1l209.3-89.7c13.3-5.7 21.9-18.8 21.9-33.2s-8.6-27.5-21.9-33.2l-31.2-13.4L430 363.5 477.7 384 293.9 462.8c-1.9 .8-3.9 1.2-5.9 1.2s-4-.4-5.9-1.2L98.3 384 146 363.5 85.1 337.4 53.9 350.8z"
                                  ></path>
                                </svg>
                              )}
                            </div>
                          )}
                        </span>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}

            {showDeleteContainer && (
              <div
                className="deleteChatContainer flex flex-col gap-[13px] absolute right-[-90px] justify-center"
                ref={deleteContainerRef}
              >
                <span className="flex flex-row gap-[5px] items-center hover:bg-[#39393973] rounded p-[4px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M13.293 4.293a4.536 4.536 0 1 1 6.414 6.414l-1 1-7.094 7.094A5 5 0 0 1 8.9 20.197l-4.736.79a1 1 0 0 1-1.15-1.151l.789-4.736a5 5 0 0 1 1.396-2.713zM13 7.414l-6.386 6.387a3 3 0 0 0-.838 1.628l-.56 3.355 3.355-.56a3 3 0 0 0 1.628-.837L16.586 11zm5 2.172L14.414 6l.293-.293a2.536 2.536 0 0 1 3.586 3.586z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p
                    onClick={() =>
                      handleTitleClick &&
                      hoveredConversationId !== null &&
                      handleTitleClick(hoveredConversationId)
                    }
                    className="text-white"
                  >
                    Rename
                  </p>
                </span>
                <span
                  onClick={() =>
                    onDeleteConvo &&
                    hoveredConversationId !== null &&
                    onDeleteConvo(hoveredConversationId)
                  }
                  className="flex flex-row gap-[5px] items-center hover:bg-[#39393973] rounded p-[4px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4c35de"
                      fillRule="evenodd"
                      d="M10.556 4a1 1 0 0 0-.97.751l-.292 1.14h5.421l-.293-1.14A1 1 0 0 0 13.453 4zm6.224 1.892-.421-1.639A3 3 0 0 0 13.453 2h-2.897A3 3 0 0 0 7.65 4.253l-.421 1.639H4a1 1 0 1 0 0 2h.1l1.215 11.425A3 3 0 0 0 8.3 22H15.7a3 3 0 0 0 2.984-2.683l1.214-11.425H20a1 1 0 1 0 0-2zm1.108 2H6.112l1.192 11.214A1 1 0 0 0 8.3 20H15.7a1 1 0 0 0 .995-.894zM10 10a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m4 0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-[#4c35de]">Delete</p>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Container */}

      {/* Settings  Container */}

      {/* Profile  Container */}
      <div className="flex flex-row gap-[4px]  settingsContainer ">
        <Link
          href="/ai/profile"
          className="     text-[14px]   flex flex-row items-center justify-center gap-[13px] w-[135px]    "
        >
          <div className="mainIcon w-[35px] h-[35px] flex items-center justify-center bg-white text-black rounded-full">
            {clientSplitUserName}
          </div>
          <p
            className={`transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            {clientEmail}
          </p>
        </Link>

        <Link href="/ai/profile" className="mainIcon !w-[20px] !h-[20px]">
          {/* <Image alt="chatIcon" src={settingsIcon} width={100} height={100} /> */}
        </Link>
      </div>

      <div className="flex flex-row gap-[10px] justify-start self-start items-start  text-[14px]   settingsContainer !border-none !mt-0 ">
        {/* <Image src={FaceIcon} width={18} height={18} alt="Solomon Icon" /> */}
        <p
          className={`text-white transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          YungCEO AI
        </p>
    
      </div>
    </div>
  );
};
