"use client";

import { useStory } from "@/Context/StoryContext";
import useAuthInfo from "@/Hooks/useAuthInfo";
import useAxios from "@/Hooks/useAxios";
import PrivateRoutes from "@/Routes/PrivateRoutes";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

function StoryImagePreview() {
  const searchParams = useSearchParams();
  const imageURL = searchParams.get("image");
  const axiosSecure = useAxios();
  const { user } = useAuthInfo();
  const router = useRouter();
  const {storyFile} = useStory();

  const [isposting, SetIsPosting] = useState(false);

  if (!storyFile || !imageURL) {
    return <p>No image selected</p>;
  }

  const handleStoryUpload = async () => {
    if (!imageURL) return;

    try {
      SetIsPosting(true);

      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("image", storyFile)

      await axiosSecure.post("/stories/upload", formData);

      Swal.fire({
        icon: "success",
        title: "Story Posted Successfully!",
        timer: 2000,
      });

      router.push("/feeds");
    } 
    catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: error.message,
      });
    }
    finally {
      SetIsPosting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-lg h-96 md:h-125 rounded-2xl overflow-hidden shadow-2xl">
        {/* Padding box + relative */}
        <div className="relative w-full h-full p-10">
          {/* This is the element Next Image will fill */}
          <div className="relative w-full h-full">
            <Image
              src={imageURL}
              alt="Selected story image"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 items-center mt-5">
       <button
          disabled={isposting}
          className={`px-6 py-3 rounded-lg cursor-pointer transition 
            ${isposting 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-linear-to-r from-[#615FFF] to-[#9810FA]"
            }`}
          onClick={handleStoryUpload}
        >
          {isposting ? "Posting..." : "Post now"}
        </button>

        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-black cursor-pointer flex items-center gap-3 rounded-lg"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default function PageWrapper() {
  return (
    <PrivateRoutes>
      <StoryImagePreview></StoryImagePreview>
    </PrivateRoutes>
  );
}
