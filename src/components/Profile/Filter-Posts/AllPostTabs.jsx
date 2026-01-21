"use client";
import FeedsCardDesign from "@/components/Design/Card-Design/FeedsCardDesign";
import useAuthInfo from "@/Hooks/useAuthInfo";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const AllPostTabs = () => {
  const axiosSecure = useAxios();
  const {id} = useParams();
  const {user} = useAuthInfo();

  const {
    data: posts = [],
  } = useQuery({
    queryKey: ["user-post", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/getAll-posts/${id}`);
      return res.data;
    },
  });

  return (
    <div className="flex flex-col gap-5">
      {posts.length === 0 && <p className="text-gray-500">No posts yet</p>}

      {posts.map((item) => {
        return (
          <FeedsCardDesign
            key={item._id}
            _id={item._id}
            userImg={item.userImg}
            userName={item.userName}
            createdAt={item.createdAt}
            text={item.text}
            img={item.img}
            loveCount={item.loveCount}
            currentUserEmail={user?.email}
            commentCount={item.commentCount}
          />
        );
      })}
    </div>
  );
};

export default AllPostTabs;
