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
import MobileLink from "@/components/Active-Links/Links-for-mobile/MobileLink";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function FeedLayout({ children }) {
  const { user, logOutFunctionality } = useAuthInfo();
  const queryClient = new QueryClient();

  const handleLogOut = () => {
    logOutFunctionality()
      .then(() => Swal.fire({ title: "Logged out", icon: "success" }))
      .catch((err) =>
        Swal.fire({ icon: "error", title: err.message })
      );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] lg:grid lg:grid-cols-12">

      {/* ================= MOBILE + TABLET TOP BAR (Facebook style) ================= */}
      <header className="lg:hidden sticky top-0 z-50 bg-white border-b px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/feeds">
          <Logo />
        </Link>

        {/* Right actions */}
        {user && (
          <Link href="/profile">
            <div className="relative w-9 h-9 rounded-full overflow-hidden">
              <Image
                src={user.photoURL}
                alt="User"
                fill
                className="object-cover"
              />
            </div>
          </Link>
        )}
      </header>

      {/* ================= LEFT SIDEBAR (DESKTOP ONLY) ================= */}
      <aside className="hidden lg:block col-span-2 bg-white border-r border-gray-200">
        <div className="min-h-screen flex flex-col justify-between">

          {/* Logo */}
          <div>
            <div className="ps-6 py-4 border-b border-gray-200">
              <Link href="/feeds">
                <Logo />
              </Link>
            </div>

            {/* Navigation */}
            <nav className="ps-6 mt-6 space-y-2 text-black">
              <ActiveLinks href="/feeds">
                <BiHomeAlt className="text-xl" />
                <span>Feed</span>
              </ActiveLinks>

              <ActiveLinks href="/connections">
                <LuUsersRound className="text-xl" />
                <span>Connections</span>
              </ActiveLinks>

              <ActiveLinks href="/profile">
                <TfiUser className="text-xl" />
                <span>Profile</span>
              </ActiveLinks>
            </nav>

            {/* Create Post */}
            <div className="ps-6 mt-6">
              <Link href="/createPost">
                <button className="flex items-center gap-3 bg-gradient-to-r from-[#615FFF] to-[#9810FA] text-white px-4 py-2 rounded-xl">
                  <BsPatchPlus /> Create Post
                </button>
              </Link>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="border-t border-gray-200 px-4 py-4 flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={user.photoURL}
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-black">
                    {user.displayName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>
              <button onClick={handleLogOut}>
                <HiMiniArrowRightStartOnRectangle className="text-lg" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="col-span-12 lg:col-span-6 h-screen overflow-y-auto pb-16">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </main>

      {/* ================= RIGHT SIDEBAR (DESKTOP ONLY) ================= */}
      <aside className="hidden lg:block col-span-4 pt-6 pr-6">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="font-bold text-black">Sponsored</h3>
          <Image
            src="/assets/news_feed.png"
            alt="Sponsored"
            width={350}
            height={300}
            className="rounded-xl mt-3"
          />
          <h2 className="mt-3 font-semibold text-black">
            Email marketing
          </h2>
          <p className="text-sm text-gray-400">
            Supercharge your marketing with a powerful platform.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 mt-5">
          <h3 className="font-bold text-black">Recent Messages</h3>
        </div>
      </aside>

      {/* ================= MOBILE + TABLET BOTTOM NAV ================= */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
        <MobileLink />
      </nav>
    </div>
  );
}
