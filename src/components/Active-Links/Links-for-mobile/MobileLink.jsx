import Link from "next/link";
import React from "react";
import { BiHomeAlt } from "react-icons/bi";
import { BsPatchPlus } from "react-icons/bs";
import { LuUsersRound } from "react-icons/lu";
import { TfiUser } from "react-icons/tfi";
import ActiveMobileLink from "./ActiveMobileLink";

const MobileLink = () => {
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

      <ActiveMobileLink href="/profile">
        <TfiUser />
      </ActiveMobileLink>
    </div>
  );
};

export default MobileLink;
