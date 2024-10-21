"use client"

import Link from "next/link"
interface GlobalButtonProps {
    href: string
    text: string
    width?: string
    bgColor?: string
}

export default function GlobalButton({ href, text, width, bgColor  }: GlobalButtonProps) { 
return ( 
    <Link 
    href={href}
    target="_blank"
    className={`mt-[25px] max-w-[${width}] flex items-center justify-center bg-[${bgColor || '#2947da'}] text-black px-4 py-2 rounded-md transition-all duration-300`}
    style={{ width }}>
      {text}
    </Link>
)

}
