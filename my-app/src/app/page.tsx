"use client";

import Image from "next/image";
import Navbar from "./components/navbar";
import Header from "./components/header";
import { useState, useEffect, useCallback ,useRef} from "react";
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

  // Smooth Scroll feature

  // useEffect(() => {
  //   // Initialize Lenis for smooth scrolling
  //   const lenis = new Lenis({
  //     duration: 1.2,
  //     easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     direction: "vertical",
  //     gestureDirection: "vertical",
  //     smooth: true,
  //     smoothTouch: false,
  //     touchMultiplier: 2,
  //     infinite: false,
  //   } as any);

  //   const raf = (time: number) => {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   };

  //   requestAnimationFrame(raf);

  //   const mm = gsap.matchMedia();

  //   return () => {
  //     lenis.destroy();
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //   };
  // }, []);

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
    marquee.style.setProperty('--marquee-duration', `${duration}s`);
  
    // No need for cleanup as we're using CSS animation
  }, []);
  
  useEffect(() => {
    setupMarquee();
  }, [setupMarquee]);

  return (
    <div className="overflow-hidden relative ">
      <main className="px-[4rem]">
        <Navbar
          handleConnect={handleConnect}
          scrollToSection={scrollToSection}
        />

        <div className="flex items-center justify-between w-full text-[14px]  border-b border-white border-opacity-50   p-1 mx-auto">
          <div className="flex items-center w-full justify-between w0 h-[70px] text-[14px] text-white">
            <p>YUNG CEO</p>
            <p>SOCIETY</p>
          </div>
        </div>

        <section className="header py-[2rem] text-white flex flex-col">
          <div className="flex flex-col md:w-[60%] w-full gap-[10px]">
            <h1 className="md:text-[78px] text-[48px] font-bold ">
              Take Control Of Your Future.
            </h1>
            <p className="text-[#a3a3a3] text-[14px]">
              At 22 years old, I've been traveling outside the U.S., sustaining
              my lifestyle by leveraging digital products and other online
              income streams. Now, I'm here to teach you how to do the same. My
              goal is to help you reclaim your time through the power of passive
              income.
            </p>

            <div className="flex flex-row gap-[15px] items-center  mt-[20px]">
              <button
                onClick={() => scrollToSection("pricingSection")}
                className="  w-[180px] flex items-center justify-center  md:flex text-white px-4 py-2 rounded-md hover:bg-transparent  hover:border-black transition-colors"
              >
                Get Premium
              </button>
              <Link
                href="https://discord.gg/YErgCF5ZQE"
                target="_blank"
                className={` max-w-[200px] w-[200px] text-black flex items-center justify-center bg-white  px-4 py-2 rounded-md transition-all duration-300
                  px-4 py-2 rounded-md transition-all duration-300`}
              >
                Join Discord
              </Link>
            </div>
          </div>

          <div className="video items-end justify-end md:self-end self-center md:mt-[20px] mt-[100px]">
            <iframe
              width="738"
              height="503"
              src="https://www.youtube.com/embed/pLVrdKaCkog"
              title="Welcome To your Future"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </section>

        <section className="included my-[100px]">
          <div className="w-full flex flex-col gap-[50px] items-center justify-center text-white text-center">
            <div className="flex items-center justify-center flex-col gap-[10px] max-w-[550px]">
              <h2 className="text-[40px]">Whats Included</h2>

              <p>
                These are some of the things offered in The YungCEO Society that
                will help you create passive income foundations online
              </p>
            </div>

            <div className="flex md:flex-row flex-col gap-[20px]">
              <div className="flex flex-col gap-[10px] items-center">
                <div className="svg-contatiner bg-[#2947da] p-4 rounded-lg w-[55px] h-[55px] flex items-center justify-center">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <g clip-path="url(#clip0_1697_2534)">
                      <path
                        d="M31.8312 24.2688H12.1687C11.6875 24.2688 11.2062 24.475 10.9312 24.8875C10.6562 25.3 10.5187 25.7813 10.6562 26.2625C12.1 31.35 16.775 34.925 22 34.925C27.3625 34.925 31.9 31.4875 33.3437 26.2625C33.4812 25.7813 33.4125 25.3 33.0687 24.8875C32.7937 24.475 32.3125 24.2688 31.8312 24.2688ZM22 31.7625C18.8375 31.7625 16.0187 30.0438 14.4375 27.3625H29.5625C28.05 30.0438 25.2312 31.7625 22 31.7625Z"
                        fill="white"
                      ></path>
                      <path
                        d="M22 0.550049C10.175 0.550049 0.549988 10.175 0.549988 22C0.549988 33.825 10.175 43.5188 22.0687 43.5188C33.9625 43.5188 43.5875 33.8938 43.5875 22C43.5875 10.1063 33.825 0.550049 22 0.550049ZM22 40.425C11.825 40.425 3.57499 32.175 3.57499 22C3.57499 11.825 11.8937 3.6438 22 3.6438C32.1062 3.6438 40.425 11.8938 40.425 22.0688C40.425 32.2438 32.175 40.425 22 40.425Z"
                        fill="white"
                      ></path>
                      <path
                        d="M13.75 18.425C15.2688 18.425 16.5 17.1938 16.5 15.675C16.5 14.1563 15.2688 12.925 13.75 12.925C12.2312 12.925 11 14.1563 11 15.675C11 17.1938 12.2312 18.425 13.75 18.425Z"
                        fill="white"
                      ></path>
                      <path
                        d="M30.25 18.425C31.7688 18.425 33 17.1938 33 15.675C33 14.1563 31.7688 12.925 30.25 12.925C28.7312 12.925 27.5 14.1563 27.5 15.675C27.5 17.1938 28.7312 18.425 30.25 18.425Z"
                        fill="white"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_1697_2534">
                        <rect width="44" height="44" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <h3>Easy To Get Started</h3>

                <p className="text-[14px]">
                  Gain access to video and pdf walkthrough lessons that walk you
                  through the process step by step to make passive income
                  online.
                </p>
              </div>

              {/* Dashed line */}
              <div className="w-[0.5px] h-auto border-r border-dashed border-gray-300"></div>

              <div className="flex flex-col gap-[10px] items-center">
                <div className="svg-contatiner bg-[#2947da] p-4 rounded-lg w-[55px] h-[55px] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    id="_x32_"
                    width="70px"
                    height="70px"
                    viewBox="0 0 525 612"
                    fill="#ffffff"
                  >
                    <g>
                      <polygon
                        className="st0"
                        points="390.031,195.609 256,18.563 121.969,195.609 0,99.094 0,354.859 256,354.859 512,354.859 512,99.094     "
                      ></polygon>
                      <rect
                        y="413.438"
                        className="st0"
                        width="512"
                        height="80"
                      ></rect>
                    </g>
                  </svg>
                </div>

                <h3>Exclusive Money Making Tools</h3>

                <p className="text-[14px]">
                  Gain Access Or Discounts To Exclusive Custom Coded Software
                  That Makes Earning Money Online 10x Easier!
                </p>
              </div>

              {/* Dashed line */}
              <div className="w-[0.5px] h-auto border-r border-dashed border-gray-300"></div>

              <div className="flex flex-col gap-[10px] items-center">
                <div className="svg-contatiner bg-[#2947da] p-4 rounded-lg w-[55px] h-[55px] flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#ffffff"
                    width="80px"
                    height="800px"
                    viewBox="0 0 25 25"
                  >
                    <path d="M5,7A1,1,0,0,0,4,8V22a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V8a1,1,0,0,0-1-1H13V4.723a2,2,0,1,0-2,0V7ZM18,9V21H6V9ZM7,13a1,1,0,0,1,1-1h2a1,1,0,0,1,0,2H8A1,1,0,0,1,7,13Zm6,0a1,1,0,0,1,1-1h2a1,1,0,0,1,0,2H14A1,1,0,0,1,13,13ZM1,14V12a1,1,0,0,1,2,0v2a1,1,0,0,1-2,0Zm22-2v2a1,1,0,0,1-2,0V12a1,1,0,0,1,2,0ZM7,18a1,1,0,0,1,1-1h8a1,1,0,0,1,0,2H8A1,1,0,0,1,7,18Z"></path>
                  </svg>
                </div>

                <h3>Exclusive Methods</h3>

                <p className="text-[14px]">
                  Instantly Gain Access To A Consistently Updated Repository Of
                  Money Making Methods You Can Start Now With Little To No
                  Capital.
                </p>
              </div>

              {/* Dashed line */}
              <div className="w-[0.5px] h-auto border-r border-dashed border-gray-300"></div>

              <div className="flex flex-col gap-[10px] items-center">
                <div className="svg-contatiner bg-[#2947da] p-4 rounded-lg w-[55px] h-[55px] flex items-center justify-center">
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-current"
                  >
                    <path
                      d="M36.4375 7.35627C32.1062 2.95627 26.0562 0.82502 19.9375 1.51252C10.3813 2.47502 2.81875 10.1063 1.7875 19.5938C1.375 23.9938 2.26875 28.2563 4.46875 31.9688L1.71875 39.1188C1.30625 40.0813 1.58125 41.25 2.40625 41.9375C2.8875 42.35 3.50625 42.625 4.125 42.625C4.5375 42.625 4.88125 42.5563 5.29375 42.35L11.55 39.1875C15.3312 41.4563 19.5937 42.4188 24.0625 42.0063C33.6875 41.1125 41.3875 33.4813 42.35 23.7875C42.9687 17.6688 40.8375 11.6875 36.4375 7.35627ZM39.2562 23.5125C38.4312 31.6938 31.9 38.1563 23.7187 38.9125C19.6625 39.325 15.8125 38.2938 12.4438 36.0938C12.1688 35.8875 11.8938 35.8188 11.6187 35.8188C11.4125 35.8188 11.1375 35.8875 10.9312 35.9563L5.0875 38.8438L7.63125 32.2438C7.8375 31.7625 7.76875 31.2813 7.49375 30.8688C5.3625 27.5688 4.46875 23.7188 4.88125 19.7313C5.70625 11.825 12.1688 5.43127 20.2125 4.60627C25.4375 4.05627 30.5937 5.84377 34.2375 9.55627C37.95 13.2 39.8062 18.2875 39.2562 23.5125Z"
                      fill="white"
                    ></path>
                    <path
                      d="M16.2937 16.4313H26.4687C27.2937 16.4313 28.05 15.7438 28.05 14.8501C28.05 13.9563 27.3625 13.2688 26.4687 13.2688H16.2937C15.4687 13.2688 14.7125 13.9563 14.7125 14.8501C14.7125 15.7438 15.4687 16.4313 16.2937 16.4313Z"
                      fill="white"
                    ></path>
                    <path
                      d="M30.525 20.4187H16.2937C15.4687 20.4187 14.7125 21.1062 14.7125 22C14.7125 22.8937 15.4 23.5125 16.2937 23.5125H30.525C31.35 23.5125 32.1062 22.825 32.1062 22C32.1062 21.175 31.35 20.4187 30.525 20.4187Z"
                      fill="white"
                    ></path>
                    <path
                      d="M23.4437 27.5688H16.2937C15.4687 27.5688 14.7125 28.2563 14.7125 29.1501C14.7125 30.0438 15.4 30.7313 16.2937 30.7313H23.375C24.2 30.7313 24.9562 30.0438 24.9562 29.1501C24.9562 28.2563 24.2687 27.5688 23.4437 27.5688Z"
                      fill="white"
                    ></path>
                  </svg>
                </div>

                <h3>Likeminded Community</h3>

                <p className="text-[14px]">
                  You Are Who You Associate With And We Are Here To Elevate And
                  Support Each Other. Your Network Is Your Net worth.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <section className="h-full  w-full relative">
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
          className="relative h-[80vh]"
        />
      </section>

      <div className="px-[4rem] relative overflow-x-hidden">
        {/* ... rest of the component ... */}

        <div
          id="servicesSection"
          className="flex flex-col items-start gap-[14px] text-white"
        >
          <div
            id="pricingSection"
            className="flex flex-col items-center my-[100px]   gap-[14px]"
          >
            <h3>Pick Your Plan</h3>

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
                <div className = "w-full flex items-center justify-center relative">
                  <div className="absolute top-[-25px] flex items-center justify-center w-[170px] text-bold  h-[20px] bg-[#2947da] m-auto rounded-md">
                    MOST POPULAR
                  </div>
                </div>
                <div className="flex flex-col items-center">
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
        <h2 className="text-[40px] font-bold">
          Testimonials
        </h2>
        <p>Recent Reviews</p>
        <div ref={marqueeRef} className="marquee-container">
          <div className="marquee-content">
            {testimonial.map((testimonial, index) => (
              <div key={index} className="card justify-between hover:border-white hover:border-opacity-100 transition-all duration-300 flex-shrink-0 mx-4" style={{
                display: 'flex',
                position: 'relative',
                flexDirection: 'column',
                gap: '10px',
                borderRadius: '8px',
                padding: '1rem 1rem',
                color: 'rgb(255, 255, 255)',
                border: '1px solid rgb(44, 44, 51)',
                boxShadow: 'rgba(38, 44, 52, 0.2) 0px 32px 64px -12px',
                width: '500px',
                maxWidth: '500px',
                height: '300px',
              }}>
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

        <section className="h-[70vh] my-[100px] flex items-center justify-center w-full">
          <div className="productContainer max-w-[700px] flex flex-row  text-white border border-[#f0f0f0] border-opacity-50 rounded-lg">
            <div
              className={`element-card w-[200%]  h-[320px] relative flex flex-col justify-end p-[10px] items-start overflow-hidden `}
              style={{
                backgroundImage: `url(/images/Young_black_hustle.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="productDescriptio px-[20px] pt-[10px]">
              <h3 className="text-[#2947da] text-[20px] font-bold">
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
        </section>

        <section className="testimonials h-full my-[100px] py-[20px] text-white flex flex-row relative overflow-x-hidden">
          <div className="flex flex-col gap-[10px] w-[80%]">
            <h2 className="text-[40px] font-bold relative top-0 left-0">
              About Me
            </h2>
            <p>Recent Reviews</p>

            <p className=" max-w-[600px] text-[15px]">
              I am a 22 year old who has been deep into the field of generating
              income online for now over 10 years. I have managed to leverage
              multiple online skills to be able to sustain myself traveling full
              Time without working a Job for the past 2 years.
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
                <p className="text-body-color dark:text-dark-6">Happy Clients</p>
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
                className={`mt-[25px] max-w-[200px] w-[200px] text-black flex items-center justify-center bg-white  px-4 py-2 rounded-md transition-all duration-300
                  px-4 py-2 rounded-md transition-all duration-300`}
              >
                Get Premium
              </Link>
              <GlobalButton
                href="https://discord.gg/YErgCF5ZQE"
                text="Join Discord "
                width="200px"
                bgColor="#2947da"
              />
            </div>

            <p className=" max-w-[600px] text-[15px]"></p>
            <p className=" max-w-[600px] text-[15px]"></p>

            {/* WHat We DO */}
          </div>
        </section>
      </div>

      <section id="about" className="relative h-full bg-black">
        <div className="flex flex-col md:flex-row relative w-full bg-[#0B0B0B]">
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
                className={`absolute inset-0 bg-[#0B0B0B] ${
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
