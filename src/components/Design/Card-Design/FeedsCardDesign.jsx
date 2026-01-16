import Comments from "@/components/Fedds-com/Comments";
import LoveReact from "@/components/Fedds-com/LoveReact";
import Image from "next/image";
import React from "react";

const FeedsCardDesign = ({
  userImg,
  userName,
  createdAt,
  text,
  img,
  _id,
  loveCount = 0,
  commentCount = 0,
  currentUserEmail,
}) => {
  return (
    <div className="card w-full bg-gray-50 shadow-sm text-black">
      <div className="card-body">
        <section>
          <div className="flex gap-3">
            <Image
              src={userImg}
              alt="user-photo"
              width={100}
              height={100}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <h2 className="card-title text-[1rem]">{userName}</h2>
              <p>{new Date(createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <p className="py-1 mt-1 text-[0.9rem]">{text}</p>
          </div>
        </section>
      </div>
      {/* show the signle or multiple image  */}
      {img && img.length > 0 && (
        <div
          className={`px-5 pb-2 grid gap-2 rounded-[10px] ${
            img.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {img.map((imageUrl, index) => (
            <Image
              key={index}
              src={imageUrl}
              alt={`feed-image-${index}`}
              height={300}
              width={img.length === 1 ? 600 : 300} // single image bigger width
              className="feed-image rounded-[10px] object-cover w-full"
            />
          ))}
        </div>
      )}

      <section className="py-3 ps-4 flex gap-8">
        <LoveReact
          loveId={_id}
          currentUserEmail={currentUserEmail}
          initialCount={loveCount}
        />

        <Comments
          postId={_id}
          currentUserEmail={currentUserEmail}
          initialCount={commentCount}
        />
      </section>
    </div>
  );
};

export default FeedsCardDesign;
