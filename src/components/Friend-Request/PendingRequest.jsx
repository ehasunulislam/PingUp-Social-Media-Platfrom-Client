"use client"
import React from "react";
import SkelatonCardDesign from "../Design/Card-Design/SkelatonCardDesign";
import ConnectedCardDesign from "../Design/Card-Design/ConnectedCardDesign";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxios from "@/Hooks/useAxios";
import useAuthInfo from "@/Hooks/useAuthInfo";

const PendingRequest = () => {
  const axiosSecure = useAxios();
  const { user } = useAuthInfo();
  const queryClient = useQueryClient();

  const { data: allFriendRequest = [], isLoading } = useQuery({
    queryKey: ["inComingRequest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/friends-request/incoming?email=${user?.email}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // handle Accepted friend-request functionality
  const handleAccepted = async (senderEmail) => {
    try {
      await axiosSecure.patch("/friend-request/accepted", {
        senderEmail,
        receiverEmail: user.email,
      });

      queryClient.invalidateQueries({
        queryKey: ["inComingRequest", user?.email],
      });
    } catch (err) {
      console.log(err);
    }
  };

  // handle Reject friend-request functionality
  const handleReject = async (senderEmail) => {
    try {
      await axiosSecure.patch("/friend-request/rejected", {
        senderEmail,
        receiverEmail: user.email,
      });

      queryClient.invalidateQueries({
        queryKey: ["inComingRequest", user?.email],
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {isLoading
          ? // Skeleton Loader
            Array.from({ length: 6 }).map((_, idx) => (
              <SkelatonCardDesign key={idx} />
            ))
          : // Actual Data Render
            allFriendRequest.map((item) => (
              <ConnectedCardDesign
                key={item._id}
                senderImg={item.senderImg}
                senderName={item.senderName}
                senderEmail={item.senderEmail}
                onAccept={handleAccepted}
                onReject={handleReject}
              />
            ))}
      </section>

      {/* Jodi data na thake (Empty State) */}
      {!isLoading && allFriendRequest.length === 0 && (
        <div className="mt-10 text-center">
          <p className="text-gray-500 italic">
            No incoming friend requests found.
          </p>
        </div>
      )}
    </div>
  );
};

export default PendingRequest;
