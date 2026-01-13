"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import FeedsCardDesign from "../Design/Card-Design/FeedsCardDesign";
import useAxios from "@/Hooks/useAxios";

const AllFeeds = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get("/all-posts");
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log("Error in feeds", err);
      }
    };

    fetchData();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton bg-gray-300 h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton bg-gray-500 h-4 w-20"></div>
            <div className="skeleton bg-gray-500 h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton bg-gray-300 h-32 w-full"></div>
      </div>
    );
  }

  return (
    <div className="py-3 mt-5 flex flex-col gap-3">
      {data.map((item) => {
        return (
          <FeedsCardDesign
            key={item._id}
            userImg={item.userImg}
            userName={item.userName}
            createdAt={item.createdAt}
            text={item.text}
            img={item.img}
          />
        );
      })}
    </div>
  );
};

export default AllFeeds;
