import Image from "next/image";
import React from "react";

const ProfileCard = ({ userData, currentUser }) => {
  const isOwnProfile = userData?.uid === currentUser?.uid;

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md w-full border border-gray-200 profile-card">
      <div className="flex flex-col md:flex-row items-center">
        <section>
          <div className="relative w-32 h-32 -top-12.5">
            <Image
              src={
                userData?.photoURL ||
                userData?.img ||
                "/assets/default-user.jpg"
              }
              alt={userData?.name || "User Avatar"}
              className="rounded-full object-cover border-4 border-indigo-100"
              fill
            />
          </div>
        </section>

        <section className="ps-0 md:ps-5">
          <h2 className="text-2xl font-semibold text-[1.2rem] md:text-[1.5rem]">
            {userData?.name || "Anonymous User"}
          </h2>
          <p className="text-gray-600 text-[0.9rem]  md:text-[1.2rem]">{userData?.email}</p>

          {isOwnProfile&& (
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-black rounded-md hover:bg-indigo-700 transition">
              Edit Profile
            </button>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfileCard;
