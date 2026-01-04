"use client"

import PrivateRoutes from "@/Routes/PrivateRoutes"
import Image from "next/image";
import { useSearchParams } from "next/navigation"

function StoryImagePreview () {
    const searchParams = useSearchParams();
    const imageURL = searchParams.get("image");

    if(!imageURL) {
        return(
            <div>
                <p>No image for preview</p>
            </div>
        )
    }

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
    <button className="bg-black px-6 py-3 rounded-lg">
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
