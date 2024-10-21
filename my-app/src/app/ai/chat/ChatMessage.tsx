import styles from "../../../styles/chat.module.css";
import { useEffect, useRef, useState } from "react";
import React, { FC, RefObject } from "react";
import ChatMessage from "./components/ChatMessageContainer";
import { debug } from "console";
import ImageComponent from "./components/ImageComponent";
import LoadingComponent from "../../components/loadingComponent";

interface ChatMessage {
  question?: string;
  response?: string;
  imageUrl?: string[]; // Add this line to include imageUrl as an optional array
}

interface ResponseObject {
  question: string;
  response: string;
  imageUrl?: string;
  id: string;
}

interface ChatMessageProps {
  responses: ResponseObject[];
}

export const ChatMessagesContainer: FC<ChatMessageProps> = ({ responses }) => {
  const [splitUserName, setSplitUserName] = useState<string>("");
  //Get the split user name
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  useEffect(() => {
    const storedSplitUserName = sessionStorage.getItem("splitUserName");

    setSplitUserName(storedSplitUserName || "");
  }, []);

  const lastMessageId =
    responses.length > 0 ? responses[responses.length - 1].id : null;

  useEffect(() => {
    // debugger
  }, [responses]);

  useEffect(() => {
  }, [imageUrls]);

  //We want to get the latest storage when we swith the platform

  return (
    <>
      <div className={styles.chat_container}>
        <div className={styles.chat_box}>
          <div className={styles.chat_flex}>
            <div className={styles.chat_Messages}>
              {responses.map((response, index) => (
                <div className={styles.response_Flex} key={index}>
                  <p
                    data-split-username={splitUserName}
                    className={`${styles.bot_Messages} ${styles.new_bot_message}`}
                  >
                    {response.question}
                  </p>
                  {response.response ? (
                    <ChatMessage
                      response={response as any}
                      shouldAnimate={response.id === lastMessageId}
                    />
                  ) : <LoadingComponent  />}
                  {response.imageUrl && (
                    <div className={styles.image_container}>
                      {Array.isArray(response.imageUrl) ? (
                        response.imageUrl.map((url, imgIndex) => (
                          <ImageComponent
                            key={`img-${index}-${imgIndex}`}
                            url={url}
                          />
                        ))
                      ) : (
                        <ImageComponent
                          key={`img-${index}`}
                          url={response.imageUrl}
                        />
                      )}
                    </div>
                  )}
                </div>
              ))}
              {imageUrls.map((url, index) => (
                <ImageComponent key={index} url={url} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
