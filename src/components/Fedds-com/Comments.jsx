import React from "react";
import { FaRegComment } from "react-icons/fa6";

const Comments = () => {
  return (
    <div className="comment-btn flex items-center gap-2 text-[1.2rem] cursor-pointer">
      <button className="cursor-pointer">
        <FaRegComment />
      </button>
      <p>0</p>
    </div>
  );
};

export default Comments;
