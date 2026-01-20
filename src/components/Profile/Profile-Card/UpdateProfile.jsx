import EditProfileDesign from "@/components/Design/Profile-Design/EditProfileDesign";
import useAuthInfo from "@/Hooks/useAuthInfo";
import useAxios from "@/Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";

const UpdateProfile = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <EditProfileDesign
        key={userData._id}
        about={userData.about}
        college={userData.college}
        school={userData.school}
        currentCity={userData.currentCity}
        country={userData.country}
        website={userData.website}
        workplace={userData.workplace}
      />
    </div>
  );
};

export default UpdateProfile;
