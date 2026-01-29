import Image from "next/image";
import React from "react";

const ConnectedCardDesign = ({ senderImg, senderName, senderEmail, onAccept, onReject }) => {
  return (
    <div className="card shadow-sm border border-gray-300  flex justify-center items-center py-3">
      <figure className="relative w-14 h-14 rounded-full overflow-hidden border border-gray-400">
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

        <section className="btn-section flex gap-2 items-center justify-center text-white">
          <button className="px-5 py-2 rounded-sm cursor-pointer bg-purple-700" onClick={() => onAccept(senderEmail)}>
            Confirm
          </button>

          <button className="px-5 py-2 rounded-sm cursor-pointer bg-black" onClick={() => onReject(senderEmail)}>
            Reject
          </button>
        </section>
      </div>
    </div>
  );
};

export default ConnectedCardDesign;
