"use client";

import useAuthInfo from "@/Hooks/useAuthInfo";
import PrivateRoutes from "@/Routes/PrivateRoutes";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { LuImageUp } from "react-icons/lu";

function CreatePostPage() {
  const { user } = useAuthInfo();

  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const imageURLs = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedImages((prev) => [...prev, ...imageURLs]);
  };

  // Cleanup memory (optional but recommended)
  useEffect(() => {
    return () => {
      selectedImages.forEach((img) => URL.revokeObjectURL(img.preview));
    };
  }, [selectedImages]);

  return (
    <div className="text-black px-5 py-5">
      <h1 className="text-4xl font-bold">Create Post</h1>
      <p className="text-gray-400">Share your thoughts with the world</p>

      <section className="image-upload-section mt-6">
        <div className="card w-full sm:max-w-md lg:max-w-xl card-sm shadow-sm">
          <form className="card-body">
            <section className="flex gap-3 items-center">
              <Image
                src={user?.photoURL}
                alt="User"
                width={50}
                height={50}
                className="rounded-full"
              />
              <h2 className="card-title">{user?.displayName}</h2>
            </section>

            <section className="my-2">
              <textarea
                className="w-full bg-transparent border-gray-400 border-t-0 border-l-0 border-r-0 border-b-2 outline-0"
                placeholder="Bio"
              ></textarea>
            </section>

            {/* Multiple Image Preview */}
            {selectedImages.length > 0 && (
              <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                {selectedImages.map((img, i) => (
                  <Image
                    key={i}
                    src={img.preview}
                    alt="Preview"
                    width={300}
                    height={300}
                    className="rounded-xl object-cover"
                  />
                ))}
              </div>
            )}

            <div className="card-actions flex justify-between items-center">
              <div>
                <input
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                />

                <button
                  className="text-gray-300 cursor-pointer"
                  onClick={handleImageClick}
                >
                  <LuImageUp size={30} />
                </button>
              </div>

              <button className="btn bg-linear-to-r from-[#615FFF] to-[#9810FA] text-white border-0">
                Publish Post
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default function PageWrapper() {
  return (
    <PrivateRoutes>
      <CreatePostPage />
    </PrivateRoutes>
  );
}
