import Image from "next/image";
import React from "react";

const FeedsImage = () => {
  return (
    <div className="py-3 mt-5">
      <div className="card w-full bg-gray-50 shadow-sm text-black">
        <div className="card-body">
          <section className="flex gap-3">
            <Image
              src="/assets/default-user.jpg"
              alt="user-photo"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />

            <div>
              <h2 className="card-title text-[1rem]">Jhone Doe</h2>
              <p>9 days ago</p>
            </div>
          </section>
        </div>
        <figure className="px-5 pb-2">
          <Image
            src="/assets/feedx.png"
            alt="Shoes"
            height={300}
            width={300}
            className="feed-image object-cover w-full"
          />
        </figure>

        <hr className="border-gray-300" />
      </div>
    </div>
  );
};

export default FeedsImage;
