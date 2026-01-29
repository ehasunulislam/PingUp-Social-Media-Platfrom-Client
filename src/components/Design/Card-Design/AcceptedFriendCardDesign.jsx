import Image from "next/image";
import React from "react";

const AcceptedFriendCardDesign = ({ senderImg, senderName, senderEmail }) => {
  return (
    <div className="card shadow-sm border border-gray-300 py-3 w-40 flex justify-center items-center mt-3">
      <figure className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-400">
        <Image
          src={senderImg}
          alt="user image"
          fill
          className="object-cover rounded-full"
        />
      </figure>

      <div className="card-body w-full text-center px-0 pt-3 ">
        <h4 className="text-[0.593rem] md:text-[0.75rem] font-bold">
          {senderName}
        </h4>
      </div>
    </div>
  );
};

export default AcceptedFriendCardDesign;
