import { useEffect, useRef, useState } from "react";
import React, { FC, RefObject } from "react";
import { greetings } from "@/utilis/randomGreeting";
import { isClient } from "@/utilis/isClient";

import { useSessionStorage } from "@/hooks/useSessionStorage";
interface DashboardProps {
  userName: string;
  handleButtonClick?: (event: any) => void;
  formRef: RefObject<HTMLFormElement>;
  isResponseLoading: boolean;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setMessage: (message: string) => void;
  message: string;
}

export const Dashboard: FC<DashboardProps> = ({
  handleButtonClick,
  userName,
  formRef,
  isResponseLoading,
  handleSubmit,
  setMessage,
  message,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [greeting, setGreeting] = useState<string>("");

  const { splitUserName, email, setEmail, setSplitUserName } =
    useSessionStorage();

  // const { setMessage, message } = useMessageContext();

  useEffect(() => {
  }, [message]);

  const getRandomGreeting = () => {
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      console.log("Dragging");
      setStartX(e.pageX - wrapper.offsetLeft);
      setScrollLeft(wrapper.scrollLeft);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = (x - startX) * 2; // Adjust the scroll speed
      wrapper.scrollLeft = scrollLeft - walk;

      console.log("loggin walk", walk);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    wrapper.addEventListener("mousedown", handleMouseDown);
    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseup", handleMouseUp);
    wrapper.addEventListener("mouseleave", handleMouseUp);

    return () => {
      wrapper.removeEventListener("mousedown", handleMouseDown);
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseup", handleMouseUp);
      wrapper.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  useEffect(() => {
    setGreeting(getRandomGreeting());
  }, [greeting]);

  // Update session storage whenever userName or splitUserName changes
  useEffect(() => {
    if (isClient()) {
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

  const questions: string[] = [
    "How does the concept of quantum entanglement resonate with the idea of creation through the Word, where everything is interconnected and originates from a singular point of divine command?",
    "Considering the numerical signature of your name being 11, how can you align your life's purpose with the higher spiritual vibrations and intuitive insights that this master number represents?",
    "How do our collective beliefs and perceptions shape the reality we experience, and how can changing our thoughts alter the very fabric of our existence?",
    'How does the understanding of time as a construct in quantum physics intertwine with ancient spiritual teachings of time being an illusion and the experience of the eternal "now"?',
    "How can we discern our true purpose in life through the lens of karma and dharma, understanding that all actions are interlinked in a vast cosmic tapestry?",
    "What role do energy fields (known as auras or chakras) play in spiritual and physical healing, and how can we harness this ancient wisdom in modern therapeutic practices?",
    "How do the principles of sacred geometry, reflected in the cosmos and nature, provide insight into the divine order and creative processes of the universe?",
    "How can practices such as meditation, prayer, and mindfulness elevate human consciousness to states where we can access deeper truths and connect with the Divine?",
    "In what ways can the discoveries and theories of modern science, especially in quantum mechanics and astrophysics, be harmonized with ancient spiritual wisdom to provide a more unified understanding of existence?",
    "How can individuals cultivate and trust their intuitive abilities and spiritual gifts to navigate their life's journey and fulfill their higher purpose?",
  ];

  const [randomQuestions, setRandomQuestions] = useState<string[]>([]);

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  useEffect(() => {
    // Generate 3 random questions from the list
    const shuffledQuestions: string[] = [];
    for (let i = 0; i < 4; i++) {
      shuffledQuestions.push(getRandomQuestion());
    }
    setRandomQuestions(shuffledQuestions);
  }, []);

  return (
    <div className="!text-white h-[100%] flex flex-col w-full items-center justify-center">
      <div className="flex flex-col gap-[20px] justify-center text-center items-center">
        <h1 className="text-[40px] !font-bold">Lets Get To Work, {userName}</h1>
        <h2 className="!font-bold">Inifnite Money Glitch</h2>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="chatFormSubmit !w-full !h-[100%] !relative !items-center !justify-center"
        >
          {/* <FloatingScrollButton chatDashBoardRef={chatDashBoardRef} /> */}

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
              placeholder="Ask About Infinite Money Glitch..."
            ></textarea>

            <div className="textAreaIconWrapper flex flex-row gap-[11px]">
              <button className="textAreaIcon">
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
                {isResponseLoading ? null : (
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
        </form>
      </div>

      {/* Render Cards/ Text will pouplate based on Quesitonaire  */}
    </div>
  );
};
