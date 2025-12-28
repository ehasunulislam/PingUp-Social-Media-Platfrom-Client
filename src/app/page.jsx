"use client"
import assets from "@/components/Assets/assets";
import Logo from "@/components/Logo/Logo";
import Image from "next/image";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { Urbanist } from "next/font/google";
import { FcGoogle, FcMultipleCameras } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { PiCameraFill } from "react-icons/pi";
import useAuthInfo from "@/Hooks/useAuthInfo";
import Swal from "sweetalert2";
import axios from "axios";
import useAxios from "@/Hooks/useAxios";
import { useRouter, useSearchParams } from "next/navigation";


const authFont = Urbanist({
  subsets: ["latin"],
});

export default function Register() {
  const {register, handleSubmit, watch, reset,formState: {errors}} = useForm();
  const [preview, setPreview] = useState(null);
  const {createUser, updateUserProfileFunction, signInWithGooglePopUpFunction} = useAuthInfo();
  const axiosSecure = useAxios();


  /* preview the image functionality start */
  const imageFile = watch("image");

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [imageFile, setPreview])
  /* preview the image functionality end */

  // redirect
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/home"

  /* handle Register functionality start */
  const handleRegister = async (data) => {
    try{
      // upload photo in imageBB
      const registerImg = data.image[0];
      const formData = new FormData();
      formData.append("image", registerImg);

      const image_BB_API_Key = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_BB_API_LINK}`;
      const imageRes = await axios.post(image_BB_API_Key, formData);
      const imageData = imageRes.data.data.url;

      // create user with firebase auth
      const registerFunction = await createUser(data.email, data.password);
      const user = registerFunction.user;
      console.log(user);

      // update user profile
      await updateUserProfileFunction(data.name, imageData)

      // send user in database
      const userData = {
        name: data.name,
        email: data.email, 
        img: imageData,
        role: "user",
        status: "approved"
      }

      const res = await axiosSecure.post("/user", userData);
      if(res.data.insertedId){
        Swal.fire({
          icon: "success",
          title: "You registerd successfully",
          showConfirmButton: false,
          timer: 2500
        });
        reset();
        router.push(redirect)
      };
    }
    catch(err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: err.message,
      });
    }
  };
  /* handle Register functionality end */ 

  /* handle GooglePopup functionality start */
  const handleGooglePopUp = async () => {
    try{
      const result = await signInWithGooglePopUpFunction();
      const signInUser = result.user;

      const userData = {
        name: signInUser.displayName, 
        email: signInUser.email,
        img: signInUser.photoURL,
        role: "user",
        status: "approved"
      };

      const res = await axiosSecure.post("/user", userData)
      if(res.data.insertedId){
        Swal.fire({
          icon: "success",
          title: "You registerd successfully",
          showConfirmButton: false,
          timer: 2500
        });
        router.push(redirect);
      };
    }
    catch(err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: err.message,
      });
    }
  }
  /* handle GooglePopup functionality end */

  
  return (
  <div
      className={`bg-zinc-50 font-sans min-h-screen px-10 md:px-50 py-10 text-black ${authFont.className}`}
      style={{
        backgroundImage: `url(${assets.register_bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Link href="/" className="inline-block transform hover:scale-105 transition-transform">
        <Logo />
      </Link>

      <div className="flex flex-col lg:flex-row justify-between items-center mt-10 lg:mt-24 gap-12">
        {/* Left Content Section */}
        <section className="max-w-xl">
          <div className="flex gap-4 items-center mb-6">
            <Image src={assets.group} alt="community" className="w-24 md:w-32 drop-shadow-sm" />
            <div>
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <IoStar key={i} className="text-[#FD9A00] text-lg" />
                ))}
              </div>
              <p className="text-sm md:text-base font-bold text-[#1C398E] tracking-tight">
                Trusted by 12k+ active developers
              </p>
            </div>
          </div>

          <h1
              className="text-[1.5rem] md:text-3xl lg:text-5xl font-bold bg-linear-to-r from-[#1E1A4D] to-[#372AAC] 
               bg-clip-text text-transparent mt-5"
            >
              More than just friends <br /> truly connect
            </h1>

          <p className="text-lg md:text-xl text-[#312C85]/80 font-medium leading-relaxed">
            Discover a global community built for builders. <br className="hidden md:block" />
            Engage, collaborate, and grow on pingup.
          </p>
        </section>

        {/* Form Section */}
        <section className="w-full max-w-105">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Create account</h2>
              <p className="text-zinc-500 text-sm mt-1.5">Join the most active community</p>
            </div>

            <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
              {/* Profile Image with Preview */}
              <div className="relative flex flex-col items-center group">
                <label className="relative cursor-pointer group">
                  <div className={`w-18 h-18 rounded-full border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-300
                    ${errors.image ? "border-red-400 bg-red-50" : "border-zinc-200 bg-zinc-50 hover:border-indigo-400 hover:bg-indigo-50"}`}>
                    
                    {preview ? (
                      <Image src={preview} alt="Profile" className="object-cover rounded-full" fill />
                    ) : (
                      <div className="text-center text-zinc-400 group-hover:text-indigo-500">
                        <FcMultipleCameras className="mx-auto text-2xl" />
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    {...register("image", { required: "Avatar is required" })}
                  />
                  <div className="absolute -bottom-1 -right-1 bg-white shadow-md rounded-full p-1.5 border border-zinc-100 text-zinc-600">
                    <PiCameraFill size={14} />
                  </div>
                </label>
                {errors.image && <p className="text-red-500 text-[10px] font-bold mt-2 uppercase">{errors.image.message}</p>}
              </div>

              {/* Name Input */}
              <div className="space-y-1">
                <div className="relative group">
                  <HiOutlineUserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("name", { required: "Name is required" })}
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-50/50 border rounded-xl text-sm transition-all focus:bg-white focus:ring-4 focus:ring-zinc-100 outline-none
                      ${errors.name ? "border-red-300" : "border-zinc-200 focus:border-zinc-900"}`}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <div className="relative group">
                  <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                  <input
                    type="email"
                    placeholder="Email address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                    })}
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-50/50 border rounded-xl text-sm transition-all focus:bg-white focus:ring-4 focus:ring-zinc-100 outline-none
                      ${errors.email ? "border-red-300" : "border-zinc-200 focus:border-zinc-900"}`}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="relative group">
                  <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-zinc-900 transition-colors" />
                  <input
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: "Password is required" })}
                    className={`w-full pl-10 pr-4 py-3 bg-zinc-50/50 border rounded-xl text-sm transition-all focus:bg-white focus:ring-4 focus:ring-zinc-100 outline-none
                      ${errors.password ? "border-red-300" : "border-zinc-200 focus:border-zinc-900"}`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2 rounded-md text-white font-medium
                       bg-linear-to-b from-zinc-700 to-zinc-900
                       hover:from-zinc-800 hover:to-black transition cursor-pointer"
              >
                Continue →
              </button>
            </form>

            <div className="relative my-2 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100"></div></div>
              <span className="relative px-3 text-[10px] font-bold uppercase text-zinc-400 bg-white">Or join with</span>
            </div>

            <div className="social-section flex flex-col justify-center items-center py-2">
              <FcGoogle size={30} className="cursor-pointer rounded-full border border-gray-400 p-1" onClick={handleGooglePopUp} />
            </div>

            <p className="text-center text-zinc-500 text-sm">
              Already a member? 
              <Link href="/login" className="text-zinc-900 font-bold hover:underline ml-1">Sign in</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

