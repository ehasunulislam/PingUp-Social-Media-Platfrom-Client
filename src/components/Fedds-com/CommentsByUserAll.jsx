"use client";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const CommentsByUserAll = ({ postId }) => {
  const allCommentBySignleUserModal = useRef(null);
  const axiosSecure = useAxios();

  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/feeds-comments/${postId}`);
      return res.data;
    },
    enabled: false,
  });

  //   open modal functionality for show all the comments
  const openCommentModal = () => {
    allCommentBySignleUserModal.current?.showModal();
    refetch();
  };


  return (
    <div>
      <button
        className="btn-sm text-sm text-gray-400 cursor-pointer hover:underline"
        onClick={openCommentModal}
      >
        comments
      </button>

      {/* all comment by signle user modal */}
      <dialog
        className="modal modal-bottom sm:modal-middle"
        ref={allCommentBySignleUserModal}
      >
        <div className="modal-box bg-white max-h-[80vh] overflow-y-auto">
          <h3 className="font-bold text-lg mb-3">All Comments</h3>

          {/* 🔥 Loading spinner INSIDE modal */}
          {isLoading && (
            <div className="flex justify-center py-5">
              <span className="loading loading-spinner text-primary"></span>
            </div>
          )}

          {/* No comments */}
          {!isLoading && comments.length === 0 && (
            <p className="text-gray-400 text-center">No comments yet</p>
          )}

          {/* Comments list */}
          {!isLoading &&
            comments.map((item) => (
              <div className="chat chat-start" key={item._id}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      alt="user image"
                      src={item.userImg || "/assets/default-user.jpg"}
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
                <div className="chat-bubble">{item.text}</div>
              </div>
            ))}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CommentsByUserAll;
