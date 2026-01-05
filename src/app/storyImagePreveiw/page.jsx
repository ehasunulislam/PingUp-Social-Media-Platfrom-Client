"use client"

import useAuthInfo from "@/Hooks/useAuthInfo";
import useAxios from "@/Hooks/useAxios";
import PrivateRoutes from "@/Routes/PrivateRoutes"
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react";
import Swal from "sweetalert2";

function StoryImagePreview () {
    const searchParams = useSearchParams();
    const imageURL = searchParams.get("image");
    const axiosSecure = useAxios();
    const {user} = useAuthInfo();
    const router = useRouter();

    if(!imageURL) {
        return(
            <div>
                <p>No image for preview</p>
            </div>
        )
    }

    const handleStoryUpload = async () => {
        if(!imageURL) return;

        try {
            // blob বানানো
            const response = await fetch(imageURL);
            const blob = await response.blob();

            // File object বানানো
            const file = new File([blob], "story.jpg", { type: blob.type });

            // FormData
            const formData = new FormData();
            formData.append("image", file);

            // ImageBB API call
            const imageBB_URL = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_BB_API_LINK}`;
            const res = await axios.post(imageBB_URL, formData);

            const imageLink = res.data.data.url; 
            // send to backend
            const newStoryData = {
                email: user?.email,
                dayPic: imageLink,
            };

            await axiosSecure.post("/stories/upload", newStoryData);

            Swal.fire({
                icon: "success",
                title: "Story Posted Successfully!",
                timer: 2000
            });

            router.push("/feeds");

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Upload Failed",
                text: error.message
            });
        }
    };


    return(
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
                <button className="bg-black px-6 py-3 rounded-lg" onClick={handleStoryUpload}>
                    Post now
                </button>

                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 cursor-pointer flex items-center gap-3"
                >
                    Go Back
                </button>
            </div>
        </div>
    )
}

export default function PageWrapper () {
    return(
        <PrivateRoutes>
            <StoryImagePreview></StoryImagePreview>
        </PrivateRoutes>
    )
}
