"use client";

import Logo from "@/components/Logo/Logo";
import useAuthInfo from "@/Hooks/useAuthInfo";
import Link from "next/link";
import Image from "next/image";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MobileLink from "@/components/Active-Links/Links-for-mobile/MobileLink";
import LayoutLinks from "@/components/Active-Links/Layout-Links/LayoutLinks";
import CreatePostBtn from "@/components/Active-Links/Create-Post-Btn/CreatePostBtn";
import LayoutInUser from "@/components/Active-Links/Layout-Links/LayoutInUser";
import LogoutBtn from "@/components/Log-Out/LogoutBtn";

export default function SameDesignPageRouteLayout({ children }) {
  const { user } = useAuthInfo();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[#F8FAFC] lg:grid lg:grid-cols-12">
        {/* ================= MOBILE + TABLET TOP BAR (Facebook style) ================= */}
        <header className="lg:hidden sticky top-0 z-50 bg-white border-b px-4 py-2 flex items-center justify-between">
          {/* Logo */}
          <Link href="/feeds">
            <Logo />
          </Link>

          {/* Right actions */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              {user && (
                <div className="relative w-9 h-9 rounded-full overflow-hidden">
                  <Image
                    src={user.photoURL}
                    alt="User"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content rounded-box z-1 mt-3 p-2 -ms-19 border-0"
            >
              <li>
                <LogoutBtn />
              </li>
            </ul>
          </div>
        </header>

        {/* ================= LEFT SIDEBAR (Desktop & Tablet) ================= */}
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
              <LayoutLinks />

              {/* Create Post */}
              <CreatePostBtn />
            </div>

            {/* User Info */}
            <LayoutInUser />
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="lg:col-span-6 md:col-span-11 h-screen overflow-y-auto px-7">
          {children}
        </main>

        {/* ================= MOBILE BOTTOM NAV ================= */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-200 border-t backdrop-blur">
          <MobileLink />
        </nav>
      </div>
    </QueryClientProvider>
  );
}
