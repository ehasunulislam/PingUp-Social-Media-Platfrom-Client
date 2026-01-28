import React from "react";

const SkelatonCardDesign = () => {
  return (
    <div className="card shadow-sm border border-gray-200 flex justify-center items-center py-5 bg-white animate-pulse">
      {/* Profile Image Skeleton */}
      <div className="w-16 h-16 rounded-full bg-gray-300"></div>

      <div className="card-body w-full flex flex-col items-center px-0 pt-4 space-y-3">
        {/* Name Skeleton */}
        <div className="h-3 bg-gray-300 rounded-md w-1/2"></div>

        {/* Buttons Skeleton */}
        <div className="flex gap-2 mt-2">
          <div className="h-8 w-24 bg-gray-300 rounded-[3px]"></div>
          <div className="h-8 w-24 bg-gray-300 rounded-[3px]"></div>
        </div>
      </div>
    </div>
  );
};

export default SkelatonCardDesign;
