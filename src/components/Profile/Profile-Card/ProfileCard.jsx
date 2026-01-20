/* eslint-disable react-hooks/refs */
"use client";
import useAuthInfo from "@/Hooks/useAuthInfo";
import useAxios from "@/Hooks/useAxios";
import Image from "next/image";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { BiSolidEditAlt } from "react-icons/bi";
import { CiMedicalCross } from "react-icons/ci";
import Swal from "sweetalert2";
import UpdateProfile from "./UpdateProfile";
import { useQueryClient } from "@tanstack/react-query";

const ProfileCard = ({ userData, currentUser }) => {
  const isOwnProfile = userData?.uid === currentUser?.uid;
  const axiosSecure = useAxios();
  const {user} = useAuthInfo();
  const queryClient = useQueryClient();

  /* Edit my profile modal functionality start */
  const editProfileModal = useRef(null);

  const openEditProfileModalFunction = () => {
    editProfileModal.current?.showModal();
  };

  const closeEditProfileModalFunction = () => {
    editProfileModal.current?.close();
  };
  /* Edit my profile modal functionality end */

  /* react-hook-form functionality start */
  const { register, handleSubmit, reset, formState: { errors },} = useForm();

  const handleEditModalFrom = async (data) => {
    console.log(data);

    const editData = {
      ...data,
      email: user.email,
    };

    try {
      const res = await axiosSecure.patch("/update-user", editData);

      if(res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Profile updated successfully",
        });

        queryClient.invalidateQueries(["user"])

        reset();
        closeEditProfileModalFunction();
      }

    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "not updated",
      });
    }
  };
  /* react-hook-form functionality end */

  return (
    <div className="mx-auto p-6 bg-white rounded-lg shadow-md w-full border border-gray-200 profile-card">
      <div className="flex flex-col md:flex-row items-center">
        <section>
          <div className="relative w-32 h-32 sm:-top-10 md:-top-12.5">
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

        <section className="ps-0 md:ps-5 flex flex-col md:flex-row justify-between items-center w-full text-center md:text-left">
          <div>
            <h2 className="text-2xl font-semibold text-[1.2rem] md:text-[1.5rem]">
              {userData?.name || "Anonymous User"}
            </h2>

            <p className="text-gray-600 text-[0.9rem]  md:text-[1.2rem]">
              {userData?.email}
            </p>
          </div>

          <div>
            {isOwnProfile && (
              <button
                className="cursor-pointer mt-4 px-4 py-2 text-black rounded-md  transition flex items-center  gap-2 border border-gray-400 hover:bg-black hover:text-white"
                onClick={openEditProfileModalFunction}
              >
                <BiSolidEditAlt /> Edit
              </button>
            )}
          </div>

          {/* Edit my profile modal */}
          <dialog
            className="modal modal-bottom sm:modal-middle"
            ref={editProfileModal}
          >
            <div className="modal-box bg-white">
              <div className="heading flex justify-between items-center">
                <h3 className="font-semibold">Edit Your Profile</h3>
                <CiMedicalCross
                  className="rotate-45 cursor-pointer"
                  size={20}
                  onClick={closeEditProfileModalFunction}
                />
              </div>

              <form
                className="mt-2 space-y-3"
                onSubmit={handleSubmit(handleEditModalFrom)}
              >
                <textarea
                  placeholder="About your self"
                  className="textarea textarea-sm bg-transparent border border-gray-300 w-full"
                  {...register("about", { maxLength: 450 })}
                />
                {errors.about && (
                  <p className="text-red-500 text-sm">Max 450 characters</p>
                )}

                <section className="flex gap-3 flex-col md:flex-row">
                  <input
                    type="text"
                    placeholder="Add Your School"
                    className="input bg-transparent border border-gray-300 w-full"
                    {...register("school")}
                  />

                  <input
                    type="text"
                    placeholder="Add Your College"
                    className="input bg-transparent border border-gray-300 w-full"
                    {...register("college")}
                  />
                </section>

                <section className="flex gap-3 flex-col md:flex-row">
                  <input
                    type="text"
                    placeholder="Add Your Wrokplace"
                    className="input bg-transparent border border-gray-300 w-full"
                    {...register("workplace")}
                  />

                  <input
                    type="text"
                    placeholder="Add Your Cuurent City"
                    className="input bg-transparent border border-gray-300 w-full"
                    {...register("currentCity")}
                  />
                </section>

                <section className="flex gap-3 flex-col md:flex-row">
                  <input
                    type="text"
                    placeholder="Add Your Country"
                    className="input bg-transparent border border-gray-300 w-full"
                    {...register("country")}
                  />

                  <input
                    type="text"
                    placeholder="Give your personal website link"
                    className="input bg-transparent border border-gray-300 w-full"
                    {...register("website", {
                      pattern: {
                        value:
                          /^(https?:\/\/)?([\w.-]+)+[:\d]*?(\/[\w.-]*)*\/?$/,
                        message: "Invalid URL",
                      },
                    })}
                  />
                  {errors.website && (
                    <p className="text-red-500 text-sm">
                      {errors.website.message}
                    </p>
                  )}
                </section>

                <button
                  type="submit"
                  className="bg-linear-to-r from-[#615FFF] to-[#9810FA] text-white px-5 py-2 rounded-md cursor-pointer"
                >
                  Submit
                </button>
              </form>
            </div>
          </dialog>
        </section>
      </div>

      <div>
        <UpdateProfile  />
      </div>
    </div>
  );
};

export default ProfileCard;
