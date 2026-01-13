"use client";

import Logo from "@/components/Logo/Logo";
import useAuthInfo from "@/Hooks/useAuthInfo";
import Link from "next/link";
import Image from "next/image";
import { BiHomeAlt } from "react-icons/bi";
import { LuUsersRound } from "react-icons/lu";
import { TfiUser } from "react-icons/tfi";
import { BsPatchPlus } from "react-icons/bs";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import ActiveLinks from "@/components/Active-Links/ActiveLinks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MobileLink from "@/components/Active-Links/Links-for-mobile/MobileLink";

export default function SameDesignPageRouteLayout({ children }) {
  const { user } = useAuthInfo();
  const queryClient = new QueryClient();

  return (
    <div className="min-h-screen bg-[#F8FAFC] lg:grid lg:grid-cols-12">
      {/* ================= LEFT SIDEBAR (Desktop & Tablet) ================= */}
      <aside className="hidden md:block lg:col-span-2 md:col-span-1 bg-white border border-r-gray-200">
        <div className="min-h-screen flex flex-col justify-between">
          {/* Logo */}
          <div>
            <div className="ps-6 py-3 border border-b-gray-200">
              <Link href="/home">
                <Logo />
              </Link>
            </div>

            {/* Navigation */}
            <div className="ps-6 mt-6 space-y-2 text-black">
              <ActiveLinks href="/feeds">
                <BiHomeAlt /> <span className="hidden lg:inline">Feed</span>
              </ActiveLinks>

              <ActiveLinks href="/connections">
                <LuUsersRound />{" "}
                <span className="hidden lg:inline">Connections</span>
              </ActiveLinks>

              <ActiveLinks href="/profile">
                <TfiUser /> <span className="hidden lg:inline">Profile</span>
              </ActiveLinks>
            </div>

            {/* Create Post */}
            <div className="ps-6 mt-6 hidden lg:block">
              <Link href="/createPost">
                <button className="btn w-50 flex gap-3 bg-linear-to-r from-[#615FFF] to-[#9810FA] text-white rounded-xl border-0">
                  <BsPatchPlus /> Create Post
                </button>
              </Link>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <Link href="/profile" className="border-t py-4 px-4 border border-t-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={user.photoURL} alt="User" fill />
                  </div>
                  <div className="hidden lg:block">
                    <p className="text-sm text-gray-500 font-medium">{user.displayName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <HiMiniArrowRightStartOnRectangle />
              </div>
            </Link>
          )}
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="lg:col-span-6 md:col-span-11 h-screen overflow-y-auto">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </main>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-200 border-t backdrop-blur">
       <MobileLink />
      </nav>
    </div>
  );
}
