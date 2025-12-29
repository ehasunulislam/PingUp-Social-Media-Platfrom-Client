"use client";

import Logo from "@/components/Logo/Logo";
import useAuthInfo from "@/Hooks/useAuthInfo";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { BiHomeAlt } from "react-icons/bi";
import { LuUsersRound } from "react-icons/lu";
import { TfiUser } from "react-icons/tfi";
import { BsPatchPlus } from "react-icons/bs";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import ActiveLinks from "@/components/Active-Links/ActiveLinks";
import assets from "@/components/Assets/assets";

export default function FeedLayout({ children }) {

  const { user, logOutFunctionality } = useAuthInfo();

  const handleLogOut = () => {
    logOutFunctionality()
      .then(() => Swal.fire({ title: "Logged out", icon: "success" }))
      .catch(err =>
        Swal.fire({ icon: "error", title: err.message })
      );
  };

  return (
    <div className="grid grid-cols-12 min-h-screen bg-[#F8FAFC]">

      {/* LEFT SIDEBAR */}
      <div className="col-span-2 bg-white border border-r-gray-200">
        <div className="min-h-screen relative">

          <section className="ps-6 py-2 border border-b-gray-200">
            <Link href="/home">
              <Logo />
            </Link>
          </section>

          <div className="ps-6 mt-4 text-black">
             <ActiveLinks href="/feed">
                <BiHomeAlt /> <p>Feed</p>
            </ActiveLinks>

            <ActiveLinks href="/connections">
                <LuUsersRound /> <p>Connections</p>
            </ActiveLinks>

            <ActiveLinks href="/profile">
                <TfiUser /> <p>Profile</p>
            </ActiveLinks>
          </div>

          <div className="ps-6">
            <button className="btn flex gap-3 bg-linear-to-r from-[#615FFF] to-[#9810FA] text-white rounded-[10px] px-10 border-0">
              <BsPatchPlus /> Create a post
            </button>
          </div>

          <div className="absolute bottom-0 w-full border-t py-3">
            {user ? (
              <Link href="/">
                <div className="flex justify-between px-4 items-center">
                  <div className="flex gap-3 items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image src={user.photoURL} alt="User" fill />
                    </div>
                    <div className="text-black">
                      <p className="text-sm">{user.displayName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <div> 
                    <HiMiniArrowRightStartOnRectangle className="text-black" />
                  </div>
                </div>
              </Link>
            ) : (
              <p className="text-center">User Not Found</p>
            )}
          </div>

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="col-span-6">
        {children}
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="col-span-4 mt-3">
        {/* news feed */}
        <div className="card bg-white w-96 shadow-sm text-black px-5 pt-5">
            <h3 className="font-bold">Sponsored</h3>
            <figure className="pt-3">
                <Image
                src={"/assets/news_feed.png"}
                alt="Shoes"
                height={300}
                width={350}
                className="rounded-xl" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Email marketing</h2>
                <p className="text-gray-400">Supercharge your marketing with a powerful, easy-to-use platform built for results.</p>
            </div>
        </div>

        {/* Recent message */}
        <div className="text-black bg-white w-96 shadow mt-5 px-5 py-4 rounded"> 
            <h3 className="font-bold">Recent Messages</h3>
        </div>

        <button className="btn btn-accent" onClick={handleLogOut}>
          Logout
        </button>
      </div>

    </div>
  );
}
