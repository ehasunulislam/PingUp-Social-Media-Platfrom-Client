import Image from "next/image";
import React from "react";
import { BiSolidHeart } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { TbHeart } from "react-icons/tb";

const FeedsImage = () => {
  return (
    <div className="py-3 mt-5">
      <div className="card w-full bg-gray-50 shadow-sm text-black">
        <div className="card-body">
          <section>
            <div className="flex gap-3">
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
            </div>

            <div>
              <p className="py-1 mt-1 text-[0.9rem]">
                We are a small with a big vision — working day and night to turn
                dreams into products, and into something people love.
              </p>
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

        <section className="py-3 ps-4 flex gap-8">
          <div className="like-btn flex items-center gap-2">
            <label className="swap swap-flip text-[1.5rem]">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />

              <div className="swap-on text-red-600">
                <BiSolidHeart />
              </div>
              <div className="swap-off text-black">
                <TbHeart />
              </div>
            </label>

            <p>0</p>
          </div>

          <div className="comment-btn flex items-center gap-2 text-[1.2rem] cursor-pointer">
            <button className="cursor-pointer">
                <FaRegComment />
            </button>
            <p>0</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FeedsImage;
