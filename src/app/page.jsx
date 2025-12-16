import assets from "@/components/Assets/assets";
import Logo from "@/components/Logo/Logo";
import Image from "next/image";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { Urbanist } from "next/font/google";

const authFont = Urbanist({
  subsets: ["latin"],
  
})

export default function AuthLanding() {
  return (
    <div
      className={`bg-zinc-50 font-sans min-h-screen px-50 py-10 ${authFont.className}`}
      style={{
        backgroundImage: `url(${assets.register_bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Link href="/">
        <Logo />
      </Link>

      <div className="flex justify-between mt-20">
        <section>
          <div className="flex gap-3 items-center">
            <div>
              <Image src={assets.group} alt="group" className="w-[120px]" />
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
                <p className="text-[1.2rem] font-semibold text-[#1C398E]">
                  Used by 12k+ developers
                </p>
              </div>
            </div>
          </div>

          <div>
            <h1
              className="text-[1.2rem] md:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-[#1E1A4D] to-[#372AAC] 
               bg-clip-text text-transparent mt-5"
            >
              More than just friends <br /> truly connect
            </h1>

            <p className="text-2xl text-[#312C85] mt-2 font-semibold">
              connect with global community <br /> on pingup.
            </p>
          </div>
        </section>

        <section>
          <div className="w-90 bg-white p-5 rounded-[10px] shadow">
            <h2 className="text-2xl font-semibold text-center text-zinc-900">
              Create account
            </h2>
            <p className="text-sm text-center text-zinc-500 mt-1">
              Please fill in the details to register
            </p>

            <form className="mt-5 space-y-4">
              {/* Email */}
              <div>
                <label className="text-sm text-zinc-700 block mb-1">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-800"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-zinc-700 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password here"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-800"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm text-zinc-700 block mb-1">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-800"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full mt-2 py-2 rounded-md text-white font-medium
                       bg-gradient-to-b from-zinc-700 to-zinc-900
                       hover:from-zinc-800 hover:to-black transition"
              >
                Continue →
              </button>
            </form>

            {/* Footer */}
            <p className="text-sm text-center text-zinc-600 mt-6">
              Already have an account?{" "}
              <span className="font-semibold text-zinc-900 cursor-pointer">
                Sign in
              </span>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
