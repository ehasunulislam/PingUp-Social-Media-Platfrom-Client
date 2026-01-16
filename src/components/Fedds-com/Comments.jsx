"use client";
import useAxios from "@/Hooks/useAxios";
import React, { useRef, useState } from "react";
import { FaRegComment } from "react-icons/fa6";
import Swal from "sweetalert2";

const Comments = ({ postId, currentUserEmail, initialCount = 0 }) => {
  const writeCommentModal = useRef(null);
  const [commentText, setCommentText] = useState("");
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();

  // show the modal functionality
  const openCommentModal = () => {
    writeCommentModal.current?.showModal();
  };

  // handle submit comment funcitonality
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axiosSecure.post("/feeds-comments", {
        postId,
        userEmail: currentUserEmail,
        text: commentText,
      });

      setCount(res.data.commentCount);
      setCommentText("");
      writeCommentModal.current?.close();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  };

  return (
    <div className="comment-btn flex items-center gap-2 text-[1.2rem] cursor-pointer">
      <section onClick={openCommentModal} className="flex gap-2">
        <button className="cursor-pointer">
          <FaRegComment />
        </button>
        <p>{count}</p>
      </section>

      {/* write a comment modal */}
      <dialog
        ref={writeCommentModal}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-white">
          <form onSubmit={handleSubmitComment}>
            <textarea
              className="textarea bg-gray-200 w-full"
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <div className="modal-action">
              <button
                type="submit"
                disabled={loading}
                className="btn bg-linear-to-r from-[#615FFF] to-[#9810FA] text-white border-0"
              >
                {loading ? "Posting..." : "Submit"}
              </button>

              <button
                type="button"
                onClick={() => writeCommentModal.current?.close()}
                className="btn"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Comments;
