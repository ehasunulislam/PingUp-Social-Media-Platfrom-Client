"use client";

import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import { BsPatchPlus } from "react-icons/bs";
import { LuUsersRound } from "react-icons/lu";
import { TfiUser } from "react-icons/tfi";
import ActiveMobileLink from "./ActiveMobileLink";
import useAxios from "@/Hooks/useAxios";
import useAuthInfo from "@/Hooks/useAuthInfo";
import { useQuery } from "@tanstack/react-query";

const MobileLink = () => {
  const axiosSecure = useAxios();
  const { user: authUser } = useAuthInfo();
  const email = authUser?.email;

  const { data: user = {} } = useQuery({
    queryKey: ["user", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${email}`);
      return res.data;
    },
  });

  return (
    <div className="flex justify-around py-3 text-xl">
      <ActiveMobileLink href="/feeds">
        <BiHomeAlt />
      </ActiveMobileLink>

      <ActiveMobileLink href="/connections">
        <LuUsersRound />
      </ActiveMobileLink>

      <ActiveMobileLink href="/createPost">
        <BsPatchPlus />
      </ActiveMobileLink>

      {user?.email && (
        <ActiveMobileLink href={`/profile/${user.email}`}>
          <TfiUser /> <span className="hidden lg:inline">Profile</span>
        </ActiveMobileLink>
      )}
    </div>
  );
};

export default MobileLink;
