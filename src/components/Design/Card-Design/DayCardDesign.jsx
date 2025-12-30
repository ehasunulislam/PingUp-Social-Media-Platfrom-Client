"use client";

import Image from "next/image";

const DayCardDesign = ({ userImage, dayPic, time }) => {
    console.log(userImage);
    console.log(dayPic)
  return (
    <div className="w-28 sm:w-32 h-44 sm:h-48 rounded-xl overflow-hidden relative cursor-pointer shadow hover:scale-[1.02] duration-200">

      {/* Story Image */}
      <Image
        src={dayPic}
        alt="story"
        fill
        className="object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent"></div>

      {/* Profile Image */}
      <div className="absolute top-2 left-2">
        <div className="w-10 h-10 rounded-full border-4 border-white overflow-hidden">
          <Image
            src={userImage}
            alt="profile"
            width={50}
            height={50}
            className="object-cover"
          />

          
        </div>
      </div>

      {/* Time Text */}
      <p className="absolute bottom-2 w-full text-center text-white text-xs sm:text-sm font-semibold">
        {time}
      </p>
    </div>
  );
};

export default DayCardDesign;
