"use client";
import useAuthInfo from "@/Hooks/useAuthInfo";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import SkelatonCardDesign from "../Design/Card-Design/SkelatonCardDesign";
import AcceptedFriendCardDesign from "../Design/Card-Design/AcceptedFriendCardDesign";

const AcceptedFriends = () => {
  const { user } = useAuthInfo();
  const axiosSecure = useAxios();

  const { data: acceptedFriends = [], isLoading } = useQuery({
    queryKey: ["acceptedRequest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/friends/accepted-request?email=${user?.email}`,
      );
      return res.data;
    },
  });

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {isLoading
          ? Array.from({ length: 6 }).map((_, idx) => (
              <SkelatonCardDesign key={idx} />
            ))
          : acceptedFriends.map((item) => {
              return (
                <AcceptedFriendCardDesign
                  key={item._id}
                  senderImg={item.senderImg}
                  senderName={item.senderName}
                  senderEmail={item.senderEmail}
                />
              );
            })}
      </section>

      {/* Jodi data na thake (Empty State) */}
      {!isLoading && acceptedFriends.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-gray-500 italic">No friend requests accepted.</p>
        </div>
      )}
    </div>
  );
};

export default AcceptedFriends;
