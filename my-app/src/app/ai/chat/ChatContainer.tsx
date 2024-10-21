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

  // Add placeholder conversations

  return (
    <div
      ref={chatContainerRef}
      className={`chatContainer flex flex-col flex-1 ${
        chatContainerShown ? "none" : ""
      }`}
    >
      <div className="flex flex-col gap-[22px]  h-full">
        {" "}
        <Link href="/" className="flex flex-row items-start">
          {/* <Image src={FaceIcon} width={24} height={24} alt="Face Icon" /> */}
        </Link>
        <div className="flex flex-col gap-[13px] items-start justify-start h-[150px]">
          <div className="flex flex-row gap-[13px] items-center justify-start">
            <div
              style={{
                height: "25px",
                width: "25px",
                border: "0.5px solid #D3D3D3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-2/3 w-2/3 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5001 3.44354C12.1907 3.26491 11.8095 3.26491 11.5001 3.44354L5.24667 7.05396L12.0147 10.861L18.9699 7.17886L12.5001 3.44354ZM19.6604 9.07629L13.0002 12.6023V20.2681L19.1604 16.7115C19.4698 16.5329 19.6604 16.2027 19.6604 15.8455V9.07629ZM11.0002 20.2682V12.585L4.33984 8.83857V15.8455C4.33984 16.2027 4.53044 16.5329 4.83984 16.7115L11.0002 20.2682ZM10.5001 1.71149C11.4283 1.1756 12.5719 1.1756 13.5001 1.71149L20.1604 5.55679C21.0886 6.09269 21.6604 7.08307 21.6604 8.15487V15.8455C21.6604 16.9173 21.0886 17.9076 20.1604 18.4435L13.5001 22.2888C12.5719 22.8247 11.4283 22.8247 10.5001 22.2888L3.83984 18.4435C2.91164 17.9076 2.33984 16.9173 2.33984 15.8455V8.15487C2.33984 7.08307 2.91164 6.09269 3.83984 5.55679L10.5001 1.71149Z"
                  fill="currentColor"
                ></path>
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
              style={{
                height: "25px",
                width: "25px",
                border: "0.5px solid #D3D3D3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-2/3 w-2/3 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5001 3.44354C12.1907 3.26491 11.8095 3.26491 11.5001 3.44354L5.24667 7.05396L12.0147 10.861L18.9699 7.17886L12.5001 3.44354ZM19.6604 9.07629L13.0002 12.6023V20.2681L19.1604 16.7115C19.4698 16.5329 19.6604 16.2027 19.6604 15.8455V9.07629ZM11.0002 20.2682V12.585L4.33984 8.83857V15.8455C4.33984 16.2027 4.53044 16.5329 4.83984 16.7115L11.0002 20.2682ZM10.5001 1.71149C11.4283 1.1756 12.5719 1.1756 13.5001 1.71149L20.1604 5.55679C21.0886 6.09269 21.6604 7.08307 21.6604 8.15487V15.8455C21.6604 16.9173 21.0886 17.9076 20.1604 18.4435L13.5001 22.2888C12.5719 22.8247 11.4283 22.8247 10.5001 22.2888L3.83984 18.4435C2.91164 17.9076 2.33984 16.9173 2.33984 15.8455V8.15487C2.33984 7.08307 2.91164 6.09269 3.83984 5.55679L10.5001 1.71149Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            <Link href="/ai/chat">Chats</Link>
          </div>
        </div>
        {/* Chat ICON layered right here  */}
        <div className="chatRenderWrapper relative flex flex-col items-start justify-start gap-[13px] w-full">
          {/* Clear all Chats Div */}
          <div className="absolute w-[10px] h-[10px] left-[-20px] cursor-pointer	 "></div>

          <div className="flex flex-col gap-[13px] overflow-scroll w-[95%] chatScrollbar ">
            {isLoading ? null : (
              <>
                {conversations?.map((conversation) => (
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
                          <p
                            onClick={() => {
                              if (!editingTitle) {
                                onConversationClick &&
                                  onConversationClick(
                                    conversation.conversationId
                                  );
                              }
                            }}
                            className={`hover:text-[#8c8c8c] px-2  text-left cursor-pointer ${
                              conversation.conversationId ===
                              currentConversationId
                                ? "text-[#ffff] bg-[#545454] rounded-md px-2 py-1 border border-white border-opacity-50"
                                : ""
                            }`}
                          >
                            {conversation.title}
                          </p>
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
          className="  hoverBgBtn   text-[14px]   flex flex-row items-center justify-center gap-[13px] w-[135px]    "
        >
          <div className="mainIcon flex items-center justify-center">
            {clientSplitUserName}
          </div>
          <p>{clientEmail}</p>
        </Link>

        <Link href="/ai/profile" className="mainIcon !w-[20px] !h-[20px]">
          {/* <Image alt="chatIcon" src={settingsIcon} width={100} height={100} /> */}
        </Link>
      </div>

      <div className="flex flex-row gap-[10px] justify-end self-end items-center  text-[14px]   settingsContainer !border-none !mt-0 ">
        {/* <Image src={FaceIcon} width={18} height={18} alt="Solomon Icon" /> */}
        <p className="text-white">YungCEO AI</p>
        <Link
          href="https://www.instagram.com/solomoncopilot/"
          target="_blank"
          className="mainIcon flex items-center justify-center !w-[20px] !h-[20px] cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3117_1799)">
              <path
                d="M10 1.80078C12.6719 1.80078 12.9883 1.8125 14.0391 1.85937C15.0156 1.90234 15.543 2.06641 15.8945 2.20313C16.3594 2.38281 16.6953 2.60156 17.043 2.94922C17.3945 3.30078 17.6094 3.63281 17.7891 4.09766C17.9258 4.44922 18.0898 4.98047 18.1328 5.95312C18.1797 7.00781 18.1914 7.32422 18.1914 9.99219C18.1914 12.6641 18.1797 12.9805 18.1328 14.0313C18.0898 15.0078 17.9258 15.5352 17.7891 15.8867C17.6094 16.3516 17.3906 16.6875 17.043 17.0352C16.6914 17.3867 16.3594 17.6016 15.8945 17.7813C15.543 17.918 15.0117 18.082 14.0391 18.125C12.9844 18.1719 12.668 18.1836 10 18.1836C7.32813 18.1836 7.01172 18.1719 5.96094 18.125C4.98438 18.082 4.45703 17.918 4.10547 17.7813C3.64063 17.6016 3.30469 17.3828 2.95703 17.0352C2.60547 16.6836 2.39063 16.3516 2.21094 15.8867C2.07422 15.5352 1.91016 15.0039 1.86719 14.0313C1.82031 12.9766 1.80859 12.6602 1.80859 9.99219C1.80859 7.32031 1.82031 7.00391 1.86719 5.95312C1.91016 4.97656 2.07422 4.44922 2.21094 4.09766C2.39063 3.63281 2.60938 3.29688 2.95703 2.94922C3.30859 2.59766 3.64063 2.38281 4.10547 2.20313C4.45703 2.06641 4.98828 1.90234 5.96094 1.85937C7.01172 1.8125 7.32813 1.80078 10 1.80078ZM10 0C7.28516 0 6.94531 0.0117187 5.87891 0.0585938C4.81641 0.105469 4.08594 0.277344 3.45313 0.523438C2.79297 0.78125 2.23438 1.12109 1.67969 1.67969C1.12109 2.23438 0.78125 2.79297 0.523438 3.44922C0.277344 4.08594 0.105469 4.8125 0.0585938 5.875C0.0117188 6.94531 0 7.28516 0 10C0 12.7148 0.0117188 13.0547 0.0585938 14.1211C0.105469 15.1836 0.277344 15.9141 0.523438 16.5469C0.78125 17.207 1.12109 17.7656 1.67969 18.3203C2.23438 18.875 2.79297 19.2188 3.44922 19.4727C4.08594 19.7188 4.8125 19.8906 5.875 19.9375C6.94141 19.9844 7.28125 19.9961 9.99609 19.9961C12.7109 19.9961 13.0508 19.9844 14.1172 19.9375C15.1797 19.8906 15.9102 19.7188 16.543 19.4727C17.1992 19.2188 17.7578 18.875 18.3125 18.3203C18.8672 17.7656 19.2109 17.207 19.4648 16.5508C19.7109 15.9141 19.8828 15.1875 19.9297 14.125C19.9766 13.0586 19.9883 12.7188 19.9883 10.0039C19.9883 7.28906 19.9766 6.94922 19.9297 5.88281C19.8828 4.82031 19.7109 4.08984 19.4648 3.45703C19.2188 2.79297 18.8789 2.23438 18.3203 1.67969C17.7656 1.125 17.207 0.78125 16.5508 0.527344C15.9141 0.28125 15.1875 0.109375 14.125 0.0625C13.0547 0.0117188 12.7148 0 10 0Z"
                fill="currentColor"
              ></path>
              <path
                d="M10 4.86328C7.16406 4.86328 4.86328 7.16406 4.86328 10C4.86328 12.8359 7.16406 15.1367 10 15.1367C12.8359 15.1367 15.1367 12.8359 15.1367 10C15.1367 7.16406 12.8359 4.86328 10 4.86328ZM10 13.332C8.16016 13.332 6.66797 11.8398 6.66797 10C6.66797 8.16016 8.16016 6.66797 10 6.66797C11.8398 6.66797 13.332 8.16016 13.332 10C13.332 11.8398 11.8398 13.332 10 13.332Z"
                fill="currentColor"
              ></path>
              <path
                d="M16.5391 4.66016C16.5391 5.32422 16 5.85938 15.3398 5.85938C14.6758 5.85938 14.1406 5.32031 14.1406 4.66016C14.1406 3.99609 14.6797 3.46094 15.3398 3.46094C16 3.46094 16.5391 4 16.5391 4.66016Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_3117_1799">
                <rect width="20" height="20" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>{" "}
        </Link>
      </div>
    </div>
  );
};
