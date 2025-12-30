"use client"

import Logo from "@/components/Logo/Logo";
import Image from "next/image";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { Urbanist } from "next/font/google";
import assets from "@/components/Assets/assets";
import { FcGoogle } from "react-icons/fc";
import useAuthInfo from "@/Hooks/useAuthInfo";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
import useAxios from "@/Hooks/useAxios";
import { HiOutlineMail } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi2";

const authFont = Urbanist({
  subsets: ["latin"],
});

export default function Login() {
  const {register, handleSubmit, watch, reset,formState: {errors}} = useForm();
  const {loginUserFunctionality, signInWithGooglePopUpFunction, forgetPassword} = useAuthInfo();
  const axiosSecure = useAxios();
  
  // redirect functionality 
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/feeds";

  /* handle login functionality start */
  const handleLogin = async(data) => {
    try{
      await loginUserFunctionality(data.email, data.password)
      Swal.fire({
        title: "Login Successful 🎉",
        text: `Welcome back ${data.email}!`,
        icon: "success",
      });
      reset();
      router.push(redirect);
    }
    catch(err) {
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: err.message,
      });
    }
  }
  /* handle login functionality end */


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
      if(res.data.insertedId || res.data.message === "User already exists"){
        Swal.fire({
          icon: "success",
          title: "You logged in successfully",
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

  /* handle forget password start */
  const handleForgetPaword = async() => {
    const { value: email } = await Swal.fire({
      title: "Reset Password",
      text: "Enter your email to receive reset link",
      input: "email",
      inputPlaceholder: "Enter your email address",
      confirmButtonText: "Send Reset Link",
      showCancelButton: true,
    });

    if (!email) return;

    try {
      await forgetPassword(email);
      Swal.fire({
        icon: "success",
        title: "Email Sent!",
        text: `Password reset link sent to ${email}`,
        timer: 2500,
        showConfirmButton: false
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: err.message,
      });
    }
  }
  /* handle forget password end */

  return (
    <div
      className={`bg-zinc-50 font-sans min-h-screen px-10 md:px-50 py-10 text-black ${authFont.className}`}
      style={{
        backgroundImage: `url(${assets.register_bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Link href="/">
        <Logo />
      </Link>

      <div className="flex flex-col lg:flex-row justify-between items-center mt-5 md:mt-20">
        <section>
          <div className="flex gap-3 items-center">
            <div>
              <Image src={assets.group} alt="group" className="w-20 md:w-30" />
            </div>

            <div>
              <div>
                <div className="flex gap-1">
                  <IoStar className="text-[#FD9A00]" />
                  <IoStar className="text-[#FD9A00]" />
                  <IoStar className="text-[#FD9A00]" />
                  <IoStar className="text-[#FD9A00]" />
                  <IoStar className="text-[#FD9A00]" />
                </div>
                <p className="text-[0.9rem] md:text-[1.2rem] font-semibold text-[#1C398E]">
                  Used by 12k+ developers
                </p>
              </div>
            </div>
          </div>

          <div>
            <h1
              className="text-[1.5rem] md:text-3xl lg:text-5xl font-bold bg-linear-to-r from-[#1E1A4D] to-[#372AAC] 
               bg-clip-text text-transparent mt-5"
            >
              More than just friends <br /> truly connect
            </h1>

            <p className="text-[1rem] md:text-2xl text-[#312C85] mt-2 font-semibold">
              connect with global community <br /> on pingup.
            </p>
          </div>
        </section>

        <section className="mt-15 lg:mt-0">
          <div className="w-75 md:w-90 bg-white p-5 rounded-[10px] shadow">
            <h2 className="text-2xl font-semibold text-center text-zinc-900">
              Create account
            </h2>
            <p className="text-sm text-center text-zinc-500 mt-1">
              Please fill in the details to login
            </p>

            <form className="mt-5 space-y-4" onSubmit={handleSubmit(handleLogin)}>
              {/* Email */}
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

              {/* Password */}
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

              {/* Button */}
              <button
                type="submit"
                className="w-full mt-2 py-2 rounded-md text-white font-medium
                       bg-linear-to-b from-zinc-700 to-zinc-900
                       hover:from-zinc-800 hover:to-black transition cursor-pointer"
              >
                Continue →
              </button>

              <div>
                <p className="link text-[0.8rem] text-end" onClick={handleForgetPaword}>Forget Password</p>
              </div>
            </form>

           <div className="relative my-2 text-center">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100"></div></div>
              <span className="relative px-3 text-[10px] font-bold uppercase text-zinc-400 bg-white">Or join with</span>
            </div>

            <div className="social-section flex flex-col justify-center items-center py-2">
              <FcGoogle size={30} className="cursor-pointer rounded-full border border-gray-400 p-1" onClick={handleGooglePopUp} />
            </div>
            

            {/* Footer */}
            <p className="text-sm text-center text-zinc-600">
              Do not have an account?
              <Link href="/" className="font-semibold text-zinc-900 cursor-pointer ps-1">
                Sign up
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
