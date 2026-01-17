"use client"
import Error from "@/components/Animation/Error/Error";
import Loading from "@/components/Animation/Loading/Loading";
import useAuthInfo from "@/Hooks/useAuthInfo";
import useAxios from "@/Hooks/useAxios";
import PrivateRoutes from "@/Routes/PrivateRoutes";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
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

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="text-black min-h-screen bg-gray-50 py-10">
      <div className="mx-auto p-6 bg-white rounded-lg shadow-md w-full">
        <div className="flex flex-col items-center gap-4 ">
          <div className="relative w-32 h-32">
            <Image
              src={userData?.photoURL || userData?.img || "/assets/default-user.jpg"}
              alt={userData?.name || "User Avatar"}
              className="rounded-full object-cover border-4 border-indigo-100"
              fill 
            />
          </div>
          <h2 className="text-2xl font-semibold">{userData?.name || "Anonymous User"}</h2>
          <p className="text-gray-600">{userData?.email}</p>

          {currentUser?.uid === userData?.uid && (
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-black rounded-md hover:bg-indigo-700 transition">
              Edit Profile
            </button>
          )}
        </div>
      </div>
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