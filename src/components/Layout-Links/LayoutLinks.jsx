import React from "react";
import ActiveLinks from "../Active-Links/ActiveLinks";
import { BiHomeAlt } from "react-icons/bi";
import { LuUsersRound } from "react-icons/lu";
import { TfiUser } from "react-icons/tfi";

const LayoutLinks = () => {
  return (
    <nav className="ps-6 mt-6 space-y-2 text-black">
      <ActiveLinks href="/feeds">
        <BiHomeAlt /> <span className="hidden lg:inline">Feed</span>
      </ActiveLinks>

      <ActiveLinks href="/connections">
        <LuUsersRound />
        <span className="hidden lg:inline">Connections</span>
      </ActiveLinks>

      <ActiveLinks href="/profile">
        <TfiUser /> <span className="hidden lg:inline">Profile</span>
      </ActiveLinks>
    </nav>
  );
};

export default LayoutLinks;
