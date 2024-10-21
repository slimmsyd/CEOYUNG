"use client";
import Video from "./video";
import { useCallback } from "react";
import Link from "next/link";
export default function Footer() {
  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <footer className="relative">
      <div className="overlayDark absolute "></div>

      <div className="absolute video-bg w-[100vw]">
        <Video
          src="/Young_Convo.mp4"
          type="video/mp4"
          width="100%"
          height="100%"
          controls={false}
          autoPlay={true}
          loop={true}
          muted={true} // Ensure the video is muted for autoplay to work
          className="relative h-[20vh]"
        />
      </div>

      <div className="bg-transparent flex flex-col gap-[10px] text-white w-full h-[20vh] relative z-50 items-center py-[10px] justify-center">
        <Link
          href="https://calendly.com/ceo-terrapincrypto/30min?back=1&month=2024-09"
          target="_blank"
          className={`mt-[25px] max-w-[200px] w-[200px]  flex items-center justify-center bg-white  px-4 py-2 rounded-md transition-all duration-300
                 text-black px-4 py-2 rounded-md transition-all duration-300`}
        >
       Join Discord
        </Link>
        <div className="flex flex-col gap-[10px] items-center">
          Contact YungCEO
          <Link href="https://www.youtube.com/@YungCEO" target="_blank">
            yungceo@chosentobuildllc.com
          </Link>
        </div>
      </div>
    </footer>
  );
}
