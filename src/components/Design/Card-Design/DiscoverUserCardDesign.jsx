"use client";

import useAuthInfo from "@/Hooks/useAuthInfo";
import useAxios from "@/Hooks/useAxios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FiUserPlus } from "react-icons/fi";


const DiscoverUserCardDesign = ({ img, name, email }) => {
  const { user } = useAuthInfo();
  const axiosSecure = useAxios();

  const [status, setStatus] = useState("none");

  // handleConnect functionality
  const handleConnect = async () => {
    // send request
    if(status === "none") {
      const res = await axiosSecure.post("/friend-request/send", {
        senderName: user.name,
        senderEmail: user.email,
        receiverName: name,
        receiverEmail: email,
      });
  
      setStatus(res.data.status);
    }

    if(status === "pending") {
      const res = await axiosSecure.delete("/friend-request/cancel", {
        data: {
          senderName: user.name,
          senderEmail: user.email,
          receiverName: name,
          receiverEmail: email,
        }
      });

      setStatus(res.data.status);
    }
  };

  // handle staus when page reload then the status should not be changed
  useEffect(() => {
    if(!user?.email) return;

    axiosSecure.get(`/friend-request/status?senderEmail=${user.email}&receiverEmail=${email}`)
    .then((res) => {
      setStatus(res.data.status)
    })

  }, [user?.email, axiosSecure, email])

  return (
    <div
      className={`card shadow-sm border border-gray-300  flex justify-center items-center py-3 ${
        user.email == email && "hidden"
      }`}
    >
      <figure className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-400">
        <Image
          src={img}
          alt="user image"
          fill
          className="object-cover rounded-full"
        />
      </figure>
      <div className="card-body w-full text-center px-0 pt-3 ">
        <h4 className="text-[0.593rem] md:text-[0.75rem] font-bold">{name}</h4>
        {/* <p>{email}</p> */}
        <div className="card-actions w-full flex flex-col justify-center items-center text-center">
          <button

            className={`flex gap-2 items-center px-6 py-2  border border-gray-400  rounded-[3px] cursor-pointer ${status === "pending" ? "bg-black text-white" : "bg-purple-700 text-white"}`}
            onClick={handleConnect}
          >
            <FiUserPlus />
            {status === "none" && "connect"}
            {status === "pending" && "Pending"}
            {status === "connected" && "Connected"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscoverUserCardDesign;
