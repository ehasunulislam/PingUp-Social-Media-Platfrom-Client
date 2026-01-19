import useAuthInfo from "@/Hooks/useAuthInfo";
import Image from "next/image";
import React from "react";
import { HiMiniArrowRightStartOnRectangle } from "react-icons/hi2";

const LayoutInUser = () => {
  const { user } = useAuthInfo();
  return (
    <div>
      {user && (
        <section className="border-t py-4 px-4 border border-t-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex flex-col text-center gap-3 items-center">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={user.photoURL}
                  alt="User"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm text-gray-500 font-medium">
                  {user.displayName}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <HiMiniArrowRightStartOnRectangle />
          </div>
        </section>
      )}
    </div>
  );
};

export default LayoutInUser;
