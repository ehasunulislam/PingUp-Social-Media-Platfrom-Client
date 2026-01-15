"use client";
import React, { useRef } from "react";
import { FaRegComment } from "react-icons/fa6";

const Comments = () => {
  const writeCommentModal = useRef(null);
  const openCommentModal = () => {
    writeCommentModal.current?.showModal();
  };

  return (
    <div className="comment-btn flex items-center gap-2 text-[1.2rem] cursor-pointer">
      <section onClick={openCommentModal} className="flex gap-2">
        <button className="cursor-pointer">
          <FaRegComment />
        </button>
        <p>0</p>
      </section>

      {/* write a comment modal */}
      <dialog
        ref={writeCommentModal}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-white">
          <textarea
            className="textarea bg-gray-200 w-full"
            placeholder="write your comment"
          ></textarea>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-2">
                <button className="btn bg-linear-to-r from-[#615FFF] to-[#9810FA] text-white border-0">
                  Submit
                </button>
                <button className="btn">Close</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Comments;
