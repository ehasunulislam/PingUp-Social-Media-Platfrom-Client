import Link from "next/link";
import React from "react";
import { BsPatchPlus } from "react-icons/bs";

const CreatePostBtn = () => {
  return (
    <div className="ps-6 mt-6 hidden lg:block">
      <Link href="/createPost">
        <button className="btn w-48 flex gap-3 bg-linear-to-r from-[#615FFF] to-[#9810FA] text-white rounded-xl border-0">
          <BsPatchPlus /> Create Post
        </button>
      </Link>
    </div>
  );
};

export default CreatePostBtn;
