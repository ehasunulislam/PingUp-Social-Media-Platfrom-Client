"use client";
import Error from "@/components/Animation/Error/Error";
import Loading from "@/components/Animation/Loading/Loading";
import ProfileCard from "@/components/Profile/Profile-Card/ProfileCard";
import useAuthInfo from "@/Hooks/useAuthInfo";
import useAxios from "@/Hooks/useAxios";
import PrivateRoutes from "@/Routes/PrivateRoutes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

function MyProfile() {
  const { id } = useParams();
  const { user: currentUser } = useAuthInfo();
  const axiosSecure = useAxios();

  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <Error />
      </div>
    );
  }

  return (
    <div className="text-black min-h-screen bg-gray-50 py-10 flex-col justify-center items-center">
      <ProfileCard userData={userData} currentUser={currentUser} />
    </div>
  );
}

export default function PageWrapper() {
  return (
    <PrivateRoutes>
      <MyProfile />
    </PrivateRoutes>
  );
}
