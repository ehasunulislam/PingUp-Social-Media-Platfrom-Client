"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ActiveLinks = ({href, children}) => {
  const pathName = usePathname();
  const isActive = href === "/feeds" ? pathName === "/feeds" : pathName.startsWith(href)

  return (
    <Link href={href}  className={`flex gap-3 items-center mb-3 px-3 py-2 rounded-md me-3
        ${isActive ? "bg-[#EEF2FF] text-[#432DD7]" : "text-black"}
      `}>
        {children}
    </Link>
  )
}

export default ActiveLinks
