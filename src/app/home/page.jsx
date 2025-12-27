import assets from "@/components/Assets/assets";
import { Urbanist } from "next/font/google";

const authFont = Urbanist({
  subsets: ["latin"],
});

export default function home() {
    return(
        <div       className={`bg-zinc-50 font-sans min-h-screen px-10 md:px-50 py-10 text-black ${authFont.className}`}
      style={{
        backgroundImage: `url(${assets.register_bg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
            <p>Home</p>
        </div>
    )
}