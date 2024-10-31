"use client"

import Link from "next/link"
interface GlobalButtonProps {
    href: string
    text: string
    width?: string
    bgColor?: string
    itemPosition?: string
    textColor?: string
}

export default function GlobalButton({ href, text, width, bgColor, itemPosition , textColor  }: GlobalButtonProps) { 
return ( 
    <Link 
    href={href}
    target="_blank"
    className={`mt-[25px] max-w-[${width}] text-[${textColor || 'white'}] flex items-${itemPosition || 'center'} justify-${itemPosition || 'center'} bg-[${bgColor || '#2947da'}] px-4 py-2 rounded-md transition-all duration-300`}
    style={{ width }}>
      {text}
    </Link>
)

}
