"use client"

import useAuthInfo from "@/Hooks/useAuthInfo";
import Image from "next/image";
import React from "react";

const DiscoverUserCardDesign = ({ img, name, email }) => {
  const {user} = useAuthInfo();

  return (
    <div className={`card shadow-sm border border-gray-300  flex justify-center items-center py-3 ${user.email == email && "hidden"}`}>
      <figure className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-400">
        <Image
          src={img}
          alt="user image"
          fill
          className="object-cover rounded-full"
        />
      </figure>
      <div className="card-body w-full text-center">
        <h4 className="text-[0.75rem] font-bold">{name}</h4>
        {/* <p>{email}</p> */}
        <div className="card-actions w-full flex flex-col justify-center items-center text-center">
          <button className="btn btn-primary btn-sm">Connect</button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverUserCardDesign;
