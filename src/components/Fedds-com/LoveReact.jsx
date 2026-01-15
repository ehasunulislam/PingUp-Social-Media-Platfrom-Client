"use client";
import useAxios from "@/Hooks/useAxios";
import React, { useEffect, useState } from "react";
import { BiSolidHeart } from "react-icons/bi";
import { TbHeart } from "react-icons/tb";

const LoveReact = ({ loveId, currentUserEmail, initialCount = 0 }) => {
  const [isLoved, setIsLoved] = useState(false);
  const [loveCount, setLoveCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxios();

  useEffect(() => {
    if (!loveId || !currentUserEmail) return;

    axiosSecure
      .get(`/feeds-love/${loveId}`, {
        params: { userEmail: currentUserEmail },
      })
      .then((res) => {
        setIsLoved(res.data.isLoved);
        setLoveCount(res.data.loveCount);
      })
      .catch((err) => console.log(err));
  }, [loveId, currentUserEmail, axiosSecure]);

  // handledLoveClick
  const handLoveClick = async () => {
    if (loading) return;
    setLoading(true);

    if (!loveId || !currentUserEmail) {
      console.error("Missing required fields!");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosSecure.post("/feeds-love", {
        loveId,
        userEmail: currentUserEmail,
      });

      console.log("Server response:", res.data);

      if (res.data.action === "like") {
        setIsLoved(true);
        setLoveCount((prev) => prev + 1);
      } else {
        setIsLoved(false);
        setLoveCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.log("Love error details:", err?.response?.data);
      console.log("Status:", err?.response?.status);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="like-btn flex items-center gap-2">
      <label className="swap swap-flip text-[1.5rem]">
        {/* this hidden checkbox controls the state */}
        <input
          type="checkbox"
          checked={isLoved}
          onChange={handLoveClick}
          disabled={loading}
        />

        <div className={`swap-on text-red-600 ${loading ? "opacity-50" : ""}`}>
          <BiSolidHeart />
        </div>
        <div className={`swap-off text-black ${loading ? "opacity-50" : ""}`}>
          <TbHeart />
        </div>
      </label>

      <p>{loveCount}</p>
    </div>
  );
};

export default LoveReact;
