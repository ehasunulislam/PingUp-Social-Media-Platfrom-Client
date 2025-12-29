"use client"
import useAuthInfo from '@/Hooks/useAuthInfo'
import Image from 'next/image';
import React from 'react'
import { FaPlus } from "react-icons/fa6";

const MyDay = () => {
  const {user} = useAuthInfo();
  

  return (
    <div>
      <div className="w-28 sm:w-32 h-44 sm:h-48 rounded-[15px] overflow-hidden shadow hover:scale-[1.02] duration-200 relative cursor-pointer bg-base-200">
      {/* Story Image */}
        {user ? 
            <Image
            src={user?.photoURL}   
            alt="story"
            fill
            className="object-cover"
        />
            
        : ""}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Plus Button */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-10">
                <div className="bg-blue-600 text-white p-2 rounded-full border-4 border-gray-900">
                <FaPlus size={14} />
                </div>
            </div>

            {/* Text */}
            <p className="absolute bottom-2 w-full text-center text-xs sm:text-sm text-white font-medium">
                Create story
            </p>
        </div>
    </div>
  )
}

export default MyDay
