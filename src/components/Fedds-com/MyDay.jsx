/* eslint-disable react-hooks/refs */
"use client";
import useAuthInfo from "@/Hooks/useAuthInfo";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import DayCardDesign from "../Design/Card-Design/DayCardDesign";
import { CiLocationArrow1 } from "react-icons/ci";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

const MyDay = () => {
  const { user } = useAuthInfo();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const { data: actualStories = [] } = useQuery({
    queryKey: ["myDay"],
    queryFn: async () => {
      const res = await fetch("/day.json");
      return res.json();
    },
  });

  // Create story object
  const createStory = {
    id: "create-story",
    type: "create",
    userImage: user?.photoURL || "",
  };

  // Stories for carousel: create + actual stories
  const carouselStories = [createStory, ...actualStories];

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance timer (6 seconds per story)
  useEffect(() => {
    if (!isModalOpen || actualStories.length === 0) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % actualStories.length);
    }, 6000);

    return () => clearTimeout(timer);
  }, [isModalOpen, currentIndex, actualStories.length]);

  // Open modal at specific story
  const handleOpenModal = (index) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentIndex(0); // reset to first story when closed
  };

  // Manual navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + actualStories.length) % actualStories.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % actualStories.length);
  };

  return (
    <div className="relative space-y-4">
      {/* Swiper Carousel */}
      <Swiper
        modules={[FreeMode, Navigation]}
        slidesPerView="auto"
        freeMode={true}
        spaceBetween={30}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        className="py-2"
      >
        {carouselStories.map((item, idx) => (
          <SwiperSlide key={item.id} style={{ width: "120px" }}>
            {item.type === "create" ? (
              <div className="w-28 sm:w-32 h-44 sm:h-48 rounded-[15px] overflow-hidden shadow hover:scale-[1.02] duration-200 relative cursor-pointer bg-base-200">
                {item.userImage ? (
                  <Image
                    src={item.userImage}
                    alt="Your story"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="skeleton h-full w-full"></div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-10">
                  <div className="bg-blue-600 text-white p-2 rounded-full border-4 border-gray-900">
                    <FaPlus size={14} />
                  </div>
                </div>
                <p className="absolute bottom-2 w-full text-center text-xs sm:text-sm text-white font-medium">
                  Create story
                </p>
              </div>
            ) : (
              <div onClick={() => handleOpenModal(idx - 1)} className="cursor-pointer">
                <DayCardDesign
                  userImage={item.userImage}
                  dayPic={item.dayPic}
                  time={item.time}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons for larger screens */}
      <div className="flex justify-end">
        <div className="hidden md:flex gap-3 mt-2 px-2">
          <button
            ref={prevRef}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full"
          >
            <CiLocationArrow1 className="text-black -rotate-135" size={20} />
          </button>
          <button
            ref={nextRef}
            className="bg-gray-200 hover:bg-gray-300 p-3 rounded-full"
          >
            <CiLocationArrow1 className="text-black rotate-45" size={20} />
          </button>
        </div>
      </div>

      {/* Story Viewer Modal */}
      {isModalOpen && actualStories.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative w-full h-full max-w-md mx-auto flex flex-col">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white text-4xl z-20 hover:opacity-80"
            >
              ×
            </button>

            {/* User Info */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-3">
              <Image
                src={actualStories[currentIndex].userImage}
                alt="user"
                width={40}
                height={40}
                className="rounded-full border-2 border-white"
              />
              <div>
                <p className="text-white font-semibold">
                  {actualStories[currentIndex].userName || "User"}
                </p>
                <p className="text-gray-300 text-sm">
                  {actualStories[currentIndex].time}
                </p>
              </div>
            </div>

            {/* Progress Bars - Facebook Style */}
            <div className="absolute top-4 left-4 right-4 flex gap-1 z-10">
              {actualStories.map((_, i) => {
                const isPast = i < currentIndex;
                const isCurrent = i === currentIndex;

                return (
                  <div
                    key={i}
                    className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden"
                  >
                    <div
                      className={`h-full rounded-full transition-all ${
                        isPast ? "bg-white w-full" : isCurrent ? "bg-white" : "bg-transparent w-0"
                      }`}
                      style={
                        isCurrent
                          ? { animation: "progress 6s linear forwards" }
                          : undefined
                      }
                    />
                  </div>
                );
              })}
            </div>

            {/* Story Image */}
            <Image
              src={actualStories[currentIndex].dayPic}
              alt="story"
              fill
              className="object-contain"
              priority
            />

            {/* Tap areas for prev/next */}
            <div
              onClick={handlePrev}
              className="absolute left-0 top-0 bottom-0 w-1/3 cursor-pointer z-10"
            />
            <div
              onClick={handleNext}
              className="absolute right-0 top-0 bottom-0 w-1/3 cursor-pointer z-10"
            />
          </div>
        </div>
      )}

      {/* Global keyframes for progress animation */}
      <style jsx global>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default MyDay;