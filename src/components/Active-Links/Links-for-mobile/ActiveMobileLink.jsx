"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ActiveMobileLink = ({href, children}) => {
  const pathName = usePathname();
  const isActive = pathName === href || pathName.startsWith(`${href}`)

  return (
    <Link href={href} className={`${isActive ? "text-purple-700" : "text-gray-500" }`}>
        {children}
    </Link>
  )
}

export default ActiveMobileLink
