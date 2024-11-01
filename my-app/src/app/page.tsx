"use client";

import Image from "next/image";
import Navbar from "./components/navbar";
import Header from "./components/header";
import { useState, useEffect, useCallback, useRef } from "react";
import Footer from "./components/footer";
import GlobalButton from "./components/globalbutton";
import Link from "next/link";
import LoadingComponent from "./components/loadingComponent";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { teardownTraceSubscriber } from "next/dist/build/swc";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Video from "./components/video";

import Stars from "./components/svgs/stars";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { CommandPaletteIcon } from "@primer/octicons-react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [articleImage, setArticleImage] = useState("");
  const [articleName, setArticleName] = useState("News In Article");
  const [articleLink, setArticleLink] = useState("/");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { address } = useAccount();

  const ADMINADRESS = "0xDcFD8d5BD36667D16aDDD211C59BCdE1A9c4e23B";
  const DEVADDRESS = "EUy7RKJsBoG81yheHS7YCD8wyfJbp6CD7XB2DScoSZEs";
  const { open } = useWeb3Modal();

  const handleConnect = () => {
    open();
  };

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (
      address === ADMINADRESS ||
      address === (DEVADDRESS as unknown as `0x${string}`)
    ) {
      setIsAdmin(true);
    }

    if (!address) {
      setIsAdmin(false);
    }
  }, [address]);
  useEffect(() => {
    if (!isAdmin) {
    }
  }, [isAdmin]);

  useEffect(() => {
    // Set loading to true before fetching data
    setLoading(true);
    // Fetch saved article data on component mount
    fetch("/api/article")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data", data);
        setArticleImage(data.image.url);
        setArticleName(data.image.alt);
        setArticleLink(data.image.link);
      })
      .catch((error) => {
        console.error("Error fetching article data:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    console.log("Loading princple", loading);
  }, [loading]);
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setArticleImage(event.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleSave = useCallback(() => {
    if (!isAdmin) {
      console.log("Logging Admin", isAdmin);
      console.log(articleImage, articleName, articleLink);
      return;
    }

    // Save article data to the server
    fetch("/api/article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: articleImage,
        name: articleName,
        link: articleLink,
      }),
    }).then(() => setShowPopup(false));
  }, [articleImage, articleName, articleLink]);

  const services = [
    {
      src: "/images/mining_machines.png",
      name: "Digital Product Expert",
      description: `I have been selling digital products for the past 4 years and have built a solid foundation of multiple passive income sources that allow me to travel full time and still allowing me to have time to enjoy life.`,
      image: "/images/Flipping_Coin.jpg",
    },
    {
      src: "/images/mining_machines.png",

      name: "Mentor",
      description:
        "I have been teaching people for free for years on multiple large discord servers. Currently I offer assistance to over 10,000 members in our discord where I answer questions and provide resources to help you succeed.",
      image: "/images/Mentor.jpg",
    },
    {
      src: "/images/mining_machines.png",
      name: "Graphic Designer & Web Developer",
      description:
        "I have been doing Graphic Design since I was 11 years old and have been making money doing graphic design and web design since then as well. I actually designed this site and coded the visuals myself.I also currently have a design agency called KinglyKreations",
      image: "/images/Digital_Product_Expert.jpg",
    },
    {
      src: "/images/mining_machines.png",
      name: "Digital Nomad",
      description:
        "I have been Traveling outside of the US for the past 2 years from selling digital products and leveraging my other online skills. I also offer Travel advice in the Discord.",
      image: "/images/Young_black_hustle.jpg",
    },
  ];
  const testimonial = [
    {
      image: "/images/Flipping_Coin.jpg",
      alt: "Flipping Coin",
      text: "I've been a member for 2 months now and it is definitely worth it! In this discord all the information is there that you need to succeed, you just need to put in the work! If you listen step by step to the information/ directions there are multiple blueprints to make money laid out at your fingertips. Also there is active community, access to messages, and video calls. I recommend it.",
      location: "YungCEO Society Member",
      name: "dg543_",
    },
    {
      image: "/images/Flipping_Coin.jpg",
      alt: "Another Testimonial",
      text: "“Absolutely amazing server! Tons of support when it comes to learning marketable online income earning skills! Don’t get left behind!",
      location: "YungCEO Society Member",
      name: "pentadank",
    },
    {
      image: "/images/Flipping_Coin.jpg",
      alt: "Another Testimonial",
      text: "I'm very critical when it comes to reviewing things. YungCEO delivers on not only just the information you're seeking but also a dope community where everyone is open to any topic, building, learning and earning with each other. If you're looking for that change into digital products, YungCEO is Dank Approved 💪🏾",
      name: "ranchslanger",
      location: "YungCEO Society Member",
    },
    // Add more testimonials as needed
  ];

  const marqueeRef = useRef<HTMLDivElement>(null);

  const setupMarquee = useCallback(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const content = marquee.firstElementChild as HTMLElement;
    if (!content) return;

    // Clone the content
    const clone = content.cloneNode(true) as HTMLElement;
    marquee.appendChild(clone);

    // Calculate the animation duration based on content width
    const contentWidth = content.offsetWidth;
    const duration = contentWidth / 50; // Adjust 50 to change speed

    // Apply the animation
    marquee.style.setProperty("--marquee-duration", `${duration}s`);

    // No need for cleanup as we're using CSS animation
  }, []);

  useEffect(() => {
    setupMarquee();
  }, [setupMarquee]);

  return (
    <div className=" customBG  ">
      <main className="px-[4rem] bg-[url('https://volta.net/home/hero.png')] bg-contain bg-top bg-no-repeat">
        <Navbar
          handleConnect={handleConnect}
          scrollToSection={scrollToSection}
        />

        <section className="header py-[2rem] text-white flex flex-col pt-40 ">
          <div className="flex flex-col md:w-[70%] m-auto text-center items-center justify-center w-full gap-[10px]">
            <h1 className="mb-4 text-[30px] font-extrabold leading-tight text-dark sm:text-[60px] text-white">
              Take Control Of Your Future.
              <span className="bg-gradient-to-l from-[#007AFF] via-[#007AFF] to-transparent bg-clip-text text-transparent">
                YungCEO
              </span>
            </h1>

            <div className="max-w-[700px] mx-auto text-white text-center items-center justify-center">
              <p className="text-[rgb(161,161,170)]">
                At 22 years old, I've been traveling outside the U.S.,
                sustaining my lifestyle by leveraging digital products and other
                online income streams. Now, I'm here to teach you how to do the
                same. My goal is to help you reclaim your time through the power
                of passive income.
              </p>
            </div>

            <div className="flex flex-row gap-[15px] items-center  mt-[20px]">
              <button
                onClick={() => scrollToSection("pricingSection")}
                className="  w-[180px] flex items-center justify-center  md:flex text-white px-4 py-2 rounded-md 
               bg-transparent hover:bg-white/5 border-[0.5px] border-gray-400   "
              >
                Get Premium
              </button>
              <Link
                href="https://discord.gg/YErgCF5ZQE"
                target="_blank"
                className={` max-w-[200px] rounded-md h-[40px] w-[180px] flex items-center justify-center bg-white text-black  `}
              >
                Join Discord
              </Link>
            </div>
          </div>

          <div className=" justify-center mt-[25px] m-auto flex items-center p-2 my-[35px] mt-[50px] px-6 gap-2 text-sm font-medium border border-[hsl(217.2,32.6%,17.5%)] rounded-3xl shadow-md w-fit">
            <span className="inline-flex gap-[10px] items-center justify-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13 18V20H17V22H7V20H11V18H3C2.44772 18 2 17.5523 2 17V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V17C22 17.5523 21.5523 18 21 18H13ZM4 5V16H20V5H4ZM10 7.5L15 10.5L10 13.5V7.5Z"></path>
              </svg>
              Here The Voice
            </span>
          </div>

          <div className="video items-center justify-center md:self-center self-center">
            <div className="border-gradient p-[2px]">
              <iframe
                height="503"
                src="https://www.youtube.com/embed/pLVrdKaCkog"
                title="Welcome To your Future"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="w-[320px] md:w-[950px] rounded-xl"
              />
            </div>
          </div>
        </section>

        <section className="included my-[100px]">
          <div className="w-full flex flex-col gap-[50px] items-center justify-center text-white text-center">
            <div className="flex items-center justify-center flex-col gap-[10px] max-w-[550px]">
              <h2
                className="text-[40px]
              font-bold bg-gradient-to-r from-[#52525b] via-[#a1a1aa] to-[#52525b] bg-clip-text text-transparent
              "
              >
                Whats Included
              </h2>

              <p>
                These are some of the things offered in The YungCEO Society that
                will help you create passive income foundations online
              </p>
            </div>

            <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:py-16 lg:pb-32 relative max-w-7xl">
              <div className="grid sm:grid-cols-4 gap-y-8 gap-x-8">
                <div className="relative group">
                  <div
                    className="absolute h-px hidden sm:block group-last:hidden top-[20px] left-[calc(50%+20px)] w-[calc(100%-40px)]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #18181b, #3F3F46, #18181b)",
                    }}
                  ></div>
                  <div
                    className="relative rounded-lg flex items-center justify-center mb-4 w-10 h-10 border border-gray-300 flex-shrink-0 icon mx-auto font-semibold text-white"
                    style={{
                      background:
                        "linear-gradient(136.82deg, hsla(0, 0%, 100%, .08) 9.54%, hsla(0, 0%, 100%, 0) 101.31%)",
                    }}
                  >
                    1
                  </div>
                  <p className="mt-2 text-gray-600 text-center max-w-[12rem] mx-auto prose prose-primary dark:prose-invert prose-sm">
                    Gain access to{" "}
                    <strong className="text-white">video and pdf walkthrough lessons</strong> that walk
                    you through the process step by step to make passive
                    <strong>income online.</strong>
                  </p>
                </div>

                <div className="relative group">
                  <div
                    className="absolute h-px hidden sm:block group-last:hidden top-[20px] left-[calc(50%+20px)] w-[calc(100%-40px)]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #18181b, #3F3F46, #18181b)",
                    }}
                  ></div>
                  <div
                    className="relative rounded-lg flex items-center justify-center mb-4 w-10 h-10 border border-gray-300 flex-shrink-0 icon mx-auto font-semibold text-white"
                    style={{
                      background:
                        "linear-gradient(136.82deg, hsla(0, 0%, 100%, .08) 9.54%, hsla(0, 0%, 100%, 0) 101.31%)",
                    }}
                  >
                    2
                  </div>
                  <p className="mt-2 text-gray-600 text-center max-w-[12rem] mx-auto prose prose-primary dark:prose-invert prose-sm">
                    Instantly Gain Access To A Consistently Updated Repository
                    Of Money Making Methods You Can Start Now With
                    <strong className="text-white">
                      {" "}
                      Little To No Capital.
                    </strong>
                  </p>
                </div>

                <div className="relative group">
                  <div
                    className="absolute h-px hidden sm:block group-last:hidden top-[20px] left-[calc(50%+20px)] w-[calc(100%-40px)]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #18181b, #3F3F46, #18181b)",
                    }}
                  ></div>
                  <div
                    className="relative rounded-lg flex items-center justify-center mb-4 w-10 h-10 border border-gray-300 flex-shrink-0 icon mx-auto font-semibold text-white"
                    style={{
                      background:
                        "linear-gradient(136.82deg, hsla(0, 0%, 100%, .08) 9.54%, hsla(0, 0%, 100%, 0) 101.31%)",
                    }}
                  >
                    3
                  </div>
                  <p className="mt-2 text-gray-600 text-center max-w-[12rem] mx-auto prose prose-primary dark:prose-invert prose-sm">
                    Gain Access Or Discounts To 
                    <strong className="text-white">
                      {" "}
                      Exclusive Custom Coded Software
                    </strong>
                    That Makes Earning Money Online 10x Easier!
                  </p>
                </div>

                <div className="relative group">
                  <div
                    className="absolute h-px hidden sm:block group-last:hidden top-[20px] left-[calc(50%+20px)] w-[calc(100%-40px)]"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #18181b, #3F3F46, #18181b)",
                    }}
                  ></div>
                  <div
                    className="relative rounded-lg flex items-center justify-center mb-4 w-10 h-10 border border-gray-300 flex-shrink-0 icon mx-auto font-semibold text-white"
                    style={{
                      background:
                        "linear-gradient(136.82deg, hsla(0, 0%, 100%, .08) 9.54%, hsla(0, 0%, 100%, 0) 101.31%)",
                    }}
                  >
                    4
                  </div>
                  <p className="mt-2 text-gray-600 text-center max-w-[12rem] mx-auto prose prose-primary dark:prose-invert prose-sm">
                    <strong className="text-white">
                      {" "}
                      You Are Who You Associate With
                    </strong>{" "}
                    And We Are Here To Elevate And Support Each Other. Your
                    Network Is Your Net worth.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div
          className="h-full w-full relative
        border-[rgb(161,161,170)] border-[1px] rounded-lg
        "
        >
          <div className="overlay text-white z-10 h-full w-full absolute flex items-center justify-center bg-black bg-opacity-50">
            {/* <p className="text-[48px]">YUNG CEO</p> */}
          </div>
          <Video
            src="/Young_Black_Camera.mp4"
            type="video/mp4"
            width="100%"
            height="100%"
            controls={false}
            autoPlay={true}
            loop={true}
            muted={true} // Ensure the video is muted for autoplay to work
            className="relative h-[80vh] rounded-lg         border-[rgb(161,161,170)] border-[1px] "
          />
        </div>
      </main>
      {/* 
      <section className="h-full  w-full relative">
      
      </section> */}

      <div className="px-[2rem] sm:px-[6rem] relative overflow-x-hidden">
        {/* ... rest of the component ... */}

        <div
          id="servicesSection"
          className="flex flex-col items-start gap-[14px] text-white"
        >
          <div
            id="pricingSection"
            className="flex flex-col items-center my-[100px]   gap-[14px]"
          >
            <h3 className="font-bold bg-gradient-to-r from-[#52525b] via-[#a1a1aa] to-[#52525b] bg-clip-text text-transparents">
              Pick Your Plan
            </h3>

            <div className="w-[80px] h-[2px] dividerLine"></div>

            <div className="flex md:flex-row flex-col gap-[10px]">
              <div className="pricingCard  h-full bg-transparent">
                <div className="flex flex-col items-center">
                  <h3>Hustler</h3>
                  <div className="flex flex-row gap-[5px] items-center">
                    <h2 className="text-[30px] font-bold text-[#2947da]">
                      $7{" "}
                    </h2>
                    <div className="flex flex-col gap-[5px]">
                      <p>/ month</p>
                    </div>
                  </div>

                  <GlobalButton
                    href="https://calendly.com/ceo-terrapincrypto/30min?back=1&month=2024-09"
                    text="Select Basic"
                  />
                </div>
                <div className="w-full my-[25px] h-[2px] dividerLine"></div>

                <div className="flex flex-col gap-[10px]">
                  <div className="flex-1 space-y-3 rounded-lg px-4 py-6 dark:bg-dark-2">
                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          100+ Digital Products done-for-you
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          (Must purchase MRR to sell list)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Custom Money Making AI Assistant & Digital Product/
                          PDF Document Generator
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          (25 responses/month)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Image Upscaling & Restoration
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          (50 images/month)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Access to YungCEO Society Discord
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          (10,000+ Hustlers Working Together To Succeed)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Video Tutorials On Generating Income Online
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          Video lessons By YungCEO teaching you how to leverage
                          AI to generate passive income selling digital products
                          and more
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Premium Support
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          Weekly Money talks with YungCEO open to members
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pricingCard  h-full bg-transparent relative">
                <div className="w-full flex items-center justify-center relative">
                  <div className=" absolute  justify-center mt-[25px] m-auto flex items-center p-2 my-[35px] mt-[50px] px-6 gap-2 text-sm font-medium border border-[hsl(217.2,32.6%,17.5%)] rounded-3xl shadow-md w-fit">
                    <span className="inline-flex gap-[10px] items-center justify-center">
                      MOST POPULAR
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center pt-[50px]">
                  <h3 className="text-bold">Bread Winner</h3>
                  <div className="flex flex-row gap-[5px] items-center">
                    <h2 className="text-[30px] font-bold text-[#2947da]">
                      $19.99{" "}
                    </h2>
                    <div className="flex flex-col gap-[5px]">
                      <p>/ month</p>
                    </div>
                  </div>

                  <GlobalButton
                    href="https://calendly.com/ceo-terrapincrypto/beginner-level-consultation?back=1&month=2024-09"
                    text="Select Team"
                    textColor="rgb(161,161,170)"
                  />
                </div>
                <div className="w-full my-[25px] h-[2px] dividerLine"></div>

                <div className="flex flex-col gap-[10px]">
                  <div className="flex flex-col gap-[10px]">
                    <div className="flex-1 space-y-3 rounded-lg px-4 py-6 dark:bg-dark-2">
                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 shrink-0 text-[#007AFF]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>

                        <div>
                          <span className="text-neutral-600 dark:text-neutral-400">
                            400+ DigitalProducts & Zero To Glitching Ebook by
                            YungCEO
                          </span>
                          <br />
                          <span className="text-sm text-neutral-500">
                            (Must purchase MRR to sell done-for-you Source
                            Files)
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 shrink-0 text-[#007AFF]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>

                        <div>
                          <span className="text-neutral-600 dark:text-neutral-400">
                            Custom Money Making AI Assistant & Digital Product/
                            PDF Document Generator
                          </span>
                          <br />
                          <span className="text-sm text-neutral-500">
                            (300 responses/month)
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 shrink-0 text-[#007AFF]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>

                        <div>
                          <span className="text-neutral-600 dark:text-neutral-400">
                            Image Upscaling & Background Removal
                          </span>
                          <br />
                          <span className="text-sm text-neutral-500">
                            (Unlimited)
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 shrink-0 text-[#007AFF]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>

                        <div>
                          <span className="text-neutral-600 dark:text-neutral-400">
                            Access to YungCEO Society Discord
                          </span>
                          <br />
                          <span className="text-sm text-neutral-500">
                            (10,000+ Hustlers Working Together To Succeed)
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 shrink-0 text-[#007AFF]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>

                        <div>
                          <span className="text-neutral-600 dark:text-neutral-400">
                            Video Tutorials On Generating Income Online
                          </span>
                          <br />
                          <span className="text-sm text-neutral-500">
                            Video lessons By YungCEO teaching you how to
                            leverage AI to generate passive income selling
                            digital products and more
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 shrink-0 text-[#007AFF]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>

                        <div>
                          <span className="text-neutral-600 dark:text-neutral-400">
                            Weekly Live Calls with YungCEO
                          </span>
                          <br />
                          <span className="text-sm text-neutral-500">
                            Weekly Money talks with YungCEO open to members
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pricingCard  h-full bg-transparent">
                <div className="flex flex-col items-center">
                  <h3>CEO</h3>
                  <div className="flex flex-row gap-[5px] items-center">
                    <h2 className="text-[30px] font-bold text-[#2947da]">
                      $71{" "}
                    </h2>
                    <div className="flex flex-col gap-[5px]">
                      <p>/ month</p>
                    </div>
                  </div>

                  <GlobalButton
                    href="https://calendly.com/ceo-terrapincrypto/intermediate-level-consultation?back=1"
                    text="Select Ceo"
                  />
                </div>
                <div className="w-full my-[25px] h-[2px] dividerLine"></div>

                <div className="flex flex-col gap-[10px]">
                  <div className="flex-1 space-y-3 rounded-lg px-4 py-6 dark:bg-dark-2">
                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          400+ Digital Products & Zero To Glitching Ebook by
                          YungCEO
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          (MRR Rights for all products and access to all current
                          Done For You products - new products added Weekly)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          1 on 1 Call With YungCEO
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          (1 call/month)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Custom Money Making AI Assistant & Digital Product/
                          PDF Document Generator
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          (Unlimited responses/month)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Image Upscaling & Restoration
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          (Unlimited images/month)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Access to YungCEO Society Discord
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          (10,000+ Members Of Hustlers Working Together To
                          Succeed)
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Video Tutorials On Generating Income Online
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          Video lessons By YungCEO teaching you how to leverage
                          AI to generate passive income selling digital products
                          and more
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 text-[#007AFF]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <div>
                        <span className="text-neutral-600 dark:text-neutral-400">
                          Weekly Live Calls with YungCEO
                        </span>
                        <br />
                        <span className="text-sm text-neutral-500">
                          Weekly Money talks with YungCEO open to members
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <Testimonials /> */}

        <section className="h-auto my-[100px] flex items-center justify-center w-full text-white overflow-hidden">
          <div className="flex flex-col items-center justify-center gap-[20px] w-full">
            <h2 className="text-[40px] font-bold">Testimonials</h2>
            <p>Recent Reviews</p>
            <div ref={marqueeRef} className="marquee-container">
              <div className="marquee-content">
                {testimonial.map((testimonial, index) => (
                  <div
                    key={index}
                    className="card justify-between hover:border-white hover:border-opacity-100 transition-all duration-300 flex-shrink-0 mx-4"
                    style={{
                      display: "flex",
                      position: "relative",
                      flexDirection: "column",
                      gap: "10px",
                      borderRadius: "8px",
                      padding: "1rem 1rem",
                      color: "rgb(255, 255, 255)",
                      border: "1px solid rgb(44, 44, 51)",
                      boxShadow: "rgba(38, 44, 52, 0.2) 0px 32px 64px -12px",
                      width: "500px",
                      maxWidth: "500px",
                      height: "300px",
                    }}
                  >
                    <Stars />
                    <p className="text-[16px]">"{testimonial.text}"</p>
                    <div className="flex flex-col">
                      <p className="font-semibold">- {testimonial.name}</p>
                      <p className="text-[14px]">{testimonial.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* <section className="h-[70vh] my-[100px] flex items-center justify-center w-full">
          <div className="productContainer max-w-[700px] flex flex-col md:flex-row  text-white border  hover:border-opacity-100   rounded-lg"
          style={{
            transition: "all 0.3s ease-in-out",
            border: "1px solid rgb(44, 44, 51)",
            boxShadow: "rgba(38, 44, 52, 0.2) 0px 32px 64px -12px",

          }}
          >
            <div
              className={`element-card w-[100%] md:w-[200%] p-0 md:p-[20px]  h-[320px] relative flex flex-col justify-end p-[10px] items-start overflow-hidden `}
              style={{
                backgroundImage: `url(/images/Young_black_hustle.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="productDescription px-[20px] py-[10px] ]">
              <h3 className="text-[20px] font-bold bg-gradient-to-r from-[#52525b] via-[#a1a1aa] to-[#52525b] bg-clip-text text-transparent">
                On Sale $19.99 For a Limited Time Only!
              </h3>
              <h3 className="text-[32px] font-bold">Zero To Glitching Ebook</h3>
              <p className="text-[14px]">
                I created this ebook as an all inclusive solution for anyone
                looking to create streams of passive income online. Whether you
                are a beginner or have already made money selling digital
                products this e-book will help you increase your income online.
                This Book also comes with +400 digital product templates, 500+
                Digital Product Ideas and More.
              </p>

              <GlobalButton
                href="https://calendly.com/ceo-terrapincrypto/beginner-level-consultation?back=1&month=2024-09"
                text="Select Team"
              />
            </div>
          </div>
        </section> */}

        <section className="testimonials h-full my-[100px] py-[20px] gap-[40px] text-white flex flex-row relative overflow-x-hidden">
          <div className="flex flex-col gap-[10px] w-full px-[20px] f">
            <div
              className="productContainer w-full flex flex-col lg:flex-row  text-white border  hover:border-opacity-100   rounded-lg"
              style={{
                transition: "all 0.3s ease-in-out",
                border: "1px solid rgb(44, 44, 51)",
                boxShadow: "rgba(38, 44, 52, 0.2) 0px 32px 64px -12px",
              }}
            >
              <div
                className={`element-card w-[100%] md:w-[100%]  md:p-[20px]  h-[320px] relative flex flex-col justify-end p-[10px] items-start overflow-hidden `}
                style={{
                  backgroundImage: `url(/images/Young_black_hustle.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
              <div className="productDescription px-[20px] py-[10px] flex flex-col gap-[10px] justify-around">
                <h3 className="text-[20px] font-bold bg-gradient-to-r from-[#52525b] via-[#a1a1aa] to-[#52525b] bg-clip-text text-transparent">
                  On Sale $19.99 For a Limited Time Only!
                </h3>
                <h3 className="text-[32px] font-bold">
                  Zero To Glitching Ebook
                </h3>
                <p className="text-[14px]">
                  I created this ebook as an all inclusive solution for anyone
                  looking to create streams of passive income online. Whether
                  you are a beginner or have already made money selling digital
                  products this e-book will help you increase your income
                  online. This Book also comes with +400 digital product
                  templates, 500+ Digital Product Ideas and More.
                </p>

                <GlobalButton
                  href="https://calendly.com/ceo-terrapincrypto/beginner-level-consultation?back=1&month=2024-09"
                  text="Select Team"
                  itemPosition="start"
                />
              </div>
            </div>

            <div
              className="flex flex-col gap-[10px] items-start justify-start w-full pt-[20px] px-[20px]
           border border-gray-800 rounded-lg
          "
            >
              <div
                className="relative rounded-lg flex items-center justify-center  w-10 h-10 border border-gray-300 flex-shrink-0 icon  font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(136.82deg, hsla(0, 0%, 100%, .08) 9.54%, hsla(0, 0%, 100%, 0) 101.31%)",
                }}
              >
                <CommandPaletteIcon
                  size={24}
                  className="w-5 h-5 flex-shrink-0 u-text-gray-900"
                />{" "}
              </div>
              <h2
                className="text-[40px] font-bold relative top-0 left-0
             bg-gradient-to-r from-[#52525b] via-[#a1a1aa] to-[#52525b] bg-clip-text text-transparent
            "
              >
                About Me
              </h2>

              <p className=" w-full text-[15px] text-[rgb(161,161,170)]">
                I am a 22 year old who has been deep into the field of
                generating income online for now over 10 years. I have managed
                to leverage multiple online skills to be able to sustain myself
                traveling full Time without working a Job for the past 2 years.
              </p>
              <div className="flex flex-col md:items-center items-start justify-start space-y-6 sm:flex-row sm:space-y-0 sm:space-x-6">
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-dark dark:text-white">
                    10+ Years
                  </h3>
                  <p className="text-body-color dark:text-dark-6">Experience</p>
                </div>
                <div className="border-t border-stroke pt-4 sm:pt-0 sm:border-t-0 sm:border-x sm:px-12">
                  <h3 className="mb-2 text-2xl font-bold text-dark dark:text-white">
                    5,000+
                  </h3>
                  <p className="text-body-color dark:text-dark-6">
                    Happy Clients
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-dark dark:text-white">
                    160,000+
                  </h3>
                  <p className="text-body-color dark:text-dark-6">Followers</p>
                </div>
              </div>

              <div className="flex flex-row gap-[20px]">
                <Link
                  href="https://calendly.com/ceo-terrapincrypto/30min?back=1&month=2024-09"
                  target="_blank"
                  className={`mt-[25px] max-w-[200px] w-[200px] text-black flex items-center justify-center bg-white  px-4 py-2 rounded-md transition-all duration-300 hover:bg-white/5 
                  px-4 py-2 rounded-md transition-all duration-300`}
                >
                  Get Premium
                </Link>
                <GlobalButton
                  href="https://discord.gg/YErgCF5ZQE"
                  text="Join Discord "
                  width="200px"
                  bgColor="#2947da"
                  textColor="rgb(161,161,170)"
                />
              </div>

              <p className=" max-w-[600px] text-[15px]"></p>
              <p className=" max-w-[600px] text-[15px]"></p>

              {/* WHat We DO */}
            </div>
          </div>

          <div
            className="flex flex-col gap-[10px] w-full px-[20px]
           border border-gray-800 rounded-lg max-w-[450px]
          "
            style={{
              backgroundImage: `url('/images/YungCeo.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </section>
      </div>

      <section id="about" className="relative h-full mt-[100px]">
        <div className="flex flex-col md:flex-row relative w-full">
          {services.map((service, index) => (
            <div
              key={index}
              className={`element-card w-[100%] h-[500px] relative flex flex-col justify-end p-[10px] items-start overflow-hidden ${
                index !== 1 ? "group" : ""
              }`}
              style={{
                backgroundImage: `url(${service.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div
                className={`absolute inset-0 bg-[#0B0B0B80] ${
                  index === 1 ? "opacity-0" : "group-hover:opacity-0"
                } transition-opacity duration-300`}
              ></div>
              <span className="text-[14px] transition-opacity duration-300 absolute top-[10px] left-[15px] font-bold text-white z-10">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div
                className={`flex flex-col gap-[10px] relative z-10 ${
                  index === 1
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                } transition-opacity duration-300`}
              >
                <span className="text-[20px] font-bold text-white">
                  {service.name}
                </span>
                <p className="text-white text-[14px]">{service.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* <div className = "element-card">
      <span className="text-[14px] opacity-1 group-hover:opacity-100 transition-opacity duration-300 absolute top-[10px] left-[15px] font-bold text-white">
                01
              </span>


              <div className="flex flex-col gap-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[20px] font-bold text-white">
                  

                  </span>


      </div>
      </div> */}
      </section>

      {/* <Header onClick={() => scrollToSection("pricingSection")} /> */}

      <Footer />
    </div>
  );
}

// ... existing imports and code ...

// ... existing imports and code ...

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      image: "/images/Flipping_Coin.jpg",
      alt: "Flipping Coin",
      text: "I've been a member for 2 months now and it is definitely worth it! In this discord all the information is there that you need to succeed, you just need to put in the work! If you listen step by step to the information/ directions there are multiple blueprints to make money laid out at your fingertips. Also there is active community, access to messages, and video calls. I recommend it.",
      location: "YungCEO Society Member",
      name: "dg543_",
    },
    {
      image: "/images/Flipping_Coin.jpg",
      alt: "Another Testimonial",
      text: "I'm very critical when it comes to reviewing things. YungCEO delivers on not only just the information you're seeking but also a dope community where everyone is open to any topic, building, learning and earning with each other. If you're looking for that change into digital products, YungCEO is Dank Approved 💪🏾",
      location: "YungCEO Society Member",
      name: "pentadank",
    },
    {
      image: "/images/Flipping_Coin.jpg",
      alt: "Another Testimonial",
      text: "I'm very critical when it comes to reviewing things. YungCEO delivers on not only just the information you're seeking but also a dope community where everyone is open to any topic, building, learning and earning with each other. If you're looking for that change into digital products, YungCEO is Dank Approved 💪🏾",
      name: "ranchslanger",
      location: "YungCEO Society Member",
    },
    // Add more testimonials as needed
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="testimonials h-full my-[100px] py-[20px] text-white flex md:flex-row md:gap-[5px] gap-[20px] flex-col relative overflow-x-hidden">
      <div className="flex flex-col gap-[10px] md:w-[80%] w-full">
        <h2 className="text-[40px] font-bold relative top-0 left-0">
          Testimonials
        </h2>
        <p>Recent Reviews</p>

        <Stars />
        <p className=" max-w-[600px] text-[15px]">
          {testimonials[currentIndex].text}
        </p>
        <p className=" max-w-[600px] text-[15px]">
          {testimonials[currentIndex].name}
        </p>
        <p className=" max-w-[600px] text-[15px]">
          {testimonials[currentIndex].location}
        </p>
      </div>

      <div className="flex flex-row gap-[20px] h-full w-full justify-center items-center pb-[2rem] ">
        <div className="flex flex-row gap-[20px] flex-1 items-end self-end justify-end">
          <div
            onClick={prevSlide}
            className="border border-gray-400 border-opacity-50 p-2 cursor-pointer z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>

          <div
            onClick={nextSlide}
            className="border border-gray-400 border-opacity-50 p-2 cursor-pointer z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        <div className="image-slider max-w-[500px] flex overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="w-full flex-shrink-0 flex justify-center items-center rounded-lg overflow-hidden relative group"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.alt}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-center p-4 max-w-[80%]">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const services = [
    {
      src: "/images/mining_machines.png",
      name: "Digital Product Expert",
      description:
        "Dedicated to supporting the Bitcoin network by processing transactions in real time.",
    },
    {
      src: "/images/AI_one.png",
      name: "Mentor",
      description:
        "Cryptocurrency Consulting: Expert guidance on cryptocurrency investments, security, and blockchain integration.",
    },
    {
      src: "/images/Eth_Logo.png",
      name: "Graphic Designer & Web Developer",
      description:
        "Comprehensive support for users at all levels, from beginners to advanced, covering privacy, security, and advanced blockchain applications.",
    },
    {
      src: "/images/Bitcoin_Logo.png",
      name: "Digital Nomad",
      description:
        " Custom blockchain applications, token development, and other tailored solutions.",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + services.length) % services.length
    );
  };

  return (
    <div className="relative w-full overflow-hidden mb-[100px]">
      <div
        className={`flex transition-transform duration-300 ease-in-out ${
          isMobile ? "" : "gap-[10px]"
        }`}
        style={{
          transform: `translateX(-${
            currentIndex * (isMobile ? 100 : 100 / 3)
          }%)`,
        }}
      >
        {services.map((service, index) => (
          <div
            key={index}
            className={`${
              isMobile ? "w-full" : "w-auto"
            } h-[500px] relative flex-shrink-0 group`}
          >
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-10 absolute bg-black/50 top-0 left-0 w-full h-full items-center justify-center flex">
              <span className="text-[20px] font-bold text-white">
                {service.description}{" "}
              </span>
            </div>

            <Image
              className="h-[100%] servicesImage object-cover"
              src={service.src}
              alt={`Slide ${index + 1}`}
              width={500}
              height={500}
            />

            <div className="flex p-[10px] items-end justify-end absolute bottom-0 text-white">
              <p className="mt-2 text-center font-semibold">{service.name}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute clickBtns left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute clickBtns right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
}
