"use client";

import Logo from "@/components/Logo/Logo";
import useAuthInfo from "@/Hooks/useAuthInfo";
import Link from "next/link";
import Image from "next/image";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MobileLink from "@/components/Active-Links/Links-for-mobile/MobileLink";
import LayoutInUser from "@/components/Active-Links/Layout-Links/LayoutInUser";

export default function StoryImageUploadLayout({ children }) {
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
            </div>

            {/* User Info */}
            <LayoutInUser />
          </div>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <main className="col-span-12 lg:col-span-6 h-screen overflow-y-auto pb-16 mt-6">
          {children}
        </main>

        {/* ================= MOBILE + TABLET BOTTOM NAV ================= */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
          <MobileLink />
        </nav>
      </div>
    </QueryClientProvider>
  );
}
