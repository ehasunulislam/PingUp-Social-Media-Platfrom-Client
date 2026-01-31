"use client";
import React from "react";
import ActiveLinks from "../ActiveLinks";
import { BiHomeAlt } from "react-icons/bi";
import { LuUsersRound } from "react-icons/lu";
import { TfiUser } from "react-icons/tfi";
import useAuthInfo from "@/Hooks/useAuthInfo";
import { IoSearchSharp } from "react-icons/io5";
import { TbSettings } from "react-icons/tb";

const LayoutLinks = () => {
  const { user, loading } = useAuthInfo();

  if (loading) {
    return <div className="ps-6 mt-6 text-gray-400">Loading...</div>;
  }

  return (
    <nav className="ps-6 mt-6 space-y-2 text-black">
      <ActiveLinks href="/feeds">
        <BiHomeAlt /> <span className="hidden lg:inline">Feed</span>
      </ActiveLinks>

      <ActiveLinks href="/connections">
        <LuUsersRound />
        <span className="hidden lg:inline">Connections</span>
      </ActiveLinks>

      <ActiveLinks href="/discover">
        <IoSearchSharp />
        <span className="hidden lg:inline">Discover</span>
      </ActiveLinks>

      {user && (
        <ActiveLinks href={`/profile/${user.uid}`}>
          <TfiUser /> <span className="hidden lg:inline">Profile</span>
        </ActiveLinks>
      )}

      <ActiveLinks href="/setting">
        <TbSettings />
        <span className="hidden lg:inline">Setting</span>
      </ActiveLinks>
    </nav>
  );
};

export default LayoutLinks;
