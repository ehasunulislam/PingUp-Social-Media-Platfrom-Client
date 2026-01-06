"use client";

import Logo from "@/components/Logo/Logo";
import useAuthInfo from "@/Hooks/useAuthInfo";
import Link from "next/link";
import Image from "next/image";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function StoryImageUploadLayout({ children }) {
  const { user } = useAuthInfo();
  const queryClient = new QueryClient();

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


          <div className="w-full">
            <h3 className="text-black px-4 text-2xl font-semibold">Your Story</h3>

           <div className="pt-4">
             {user ? (
              <Link href="/profile"> 
                <div className="flex justify-between px-4 items-center">
                  <div className="flex gap-3 items-center">
                    <div className="flex gap-3 items-center">
                       <div className="relative w-10 h-10 rounded-full overflow-hidden">
                          <Image src={user.photoURL} alt="User" fill />
                        </div>
                        <div className="text-black">
                          <p className="text-sm">{user.displayName}</p>
                        </div>
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
      </div>

      {/* MAIN CONTENT */}
      <div className="col-span-6">
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </div>
    </div>
  );
}
