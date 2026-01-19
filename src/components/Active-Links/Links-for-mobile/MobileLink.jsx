"use client";

import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import { BsPatchPlus } from "react-icons/bs";
import { LuUsersRound } from "react-icons/lu";
import { TfiUser } from "react-icons/tfi";
import ActiveMobileLink from "./ActiveMobileLink";
import useAuthInfo from "@/Hooks/useAuthInfo";

const MobileLink = () => {
  const {user, loading} = useAuthInfo();

  if(loading) {
    return(
      <div className="ps-6 mt-6 text-gray-400">Loading...</div>
    )
  }
 
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
        <ActiveMobileLink href={`/profile/${user.uid}`}>
          <TfiUser /> <span className="hidden lg:inline">Profile</span>
        </ActiveMobileLink>
      )}
    </div>
  );
};

export default MobileLink;
