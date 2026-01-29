"use client";
import ConnectedCardDesign from "@/components/Design/Card-Design/ConnectedCardDesign";
import SkelatonCardDesign from "@/components/Design/Card-Design/SkelatonCardDesign";
import useAuthInfo from "@/Hooks/useAuthInfo";
import useAxios from "@/Hooks/useAxios";
import PrivateRoutes from "@/Routes/PrivateRoutes";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function Connections() {
  const axiosSecure = useAxios();
  const { user } = useAuthInfo();
  const queryClient = useQueryClient();

  const { data: allFriendRequest = [], isLoading } = useQuery({
    queryKey: ["inComingRequest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/friends-request/incoming?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // handle Accepted friend-request functionality 
  const handleAccepted = async(senderEmail) => {
    try{
        await axiosSecure.patch("/friend-request/accepted", {
            senderEmail,
            receiverEmail: user.email
        });

        queryClient.invalidateQueries({
            queryKey: ["inComingRequest", user?.email]
        })
    }
    catch(err) {
        console.log(err);
    }
  }


  // handle Reject friend-request functionality 
  const handleReject = async(senderEmail) => {
    try{
        await axiosSecure.patch("/friend-request/rejected", {
            senderEmail, 
            receiverEmail: user.email
        });

        queryClient.invalidateQueries({
            queryKey: ["inComingRequest", user?.email]
        })
    }
    catch(err) {
        console.log(err);
    }
  }

  return (
    <div className="text-black">
      <div className="mt-3 space-y-1">
        <h2 className="text-2xl md:text-3xl font-bold">Connections</h2>
        <p className="text-[0.9rem]">
          Manage your network and discover new connections
        </p>
      </div>

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
                onAccept = {handleAccepted}
                onReject = {handleReject}
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
}

export default function PageWrapper() {
  return (
    <PrivateRoutes>
      <Connections />
    </PrivateRoutes>
  );
}
