import Link from "next/link";
import { useEffect, useState } from "react";

export default function ChatHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const originalHeader = document.querySelector('[data-header="original"]');
      if (originalHeader) {
        const headerPosition = originalHeader.getBoundingClientRect().top;
        setIsScrolled(headerPosition < 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Original header */}
      <div
        data-header="original"
        className="flex flex-row w-[100%] px-[10px] py-[20px] h-[50px] gap-[10px] items-center justify-end text-white border-b border-[#807f7f57]"
      >
        <Link href="/ai/chat" className="bg-[#424242] hover:bg-[#545454] transition-colors duration-200 px-4 py-2 rounded-md cursor-pointer">
          Dashboard
        </Link>
      </div>

      {/* Fixed header that appears on scroll */}
      <div
        className={`fixed z-10 top-0 left-0 right-0 flex flex-row w-[100%] px-[10px] py-[20px] h-[50px] gap-[10px] items-center justify-end text-white border border-[#807f7f57] bg-[#1a1a1a] transition-opacity duration-300 ${
          isScrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Link href="/ai/chat" className="bg-[#424242] hover:bg-[#545454] transition-colors duration-200 px-4 py-2 rounded-md cursor-pointer">
          Dashboard
        </Link>
      </div>
    </>
  );
}
