"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";

interface AnimeData {
  id: number;
  title: string;
  imageUrl: string;
}

const animeData: AnimeData[] = [
  { id: 1, title: "One Piece", imageUrl: "/image/one-peace.png" },
  { id: 2, title: "Naruto", imageUrl: "/image/naruto.png" },
  { id: 3, title: "Attack on Titan", imageUrl: "/image/baki-hanma.png" },
  { id: 4, title: "My Hero Academia", imageUrl: "/image/card.png" },
  { id: 5, title: "Demon Slayer", imageUrl: "/image/card-1.png" },
  { id: 6, title: "Death Note", imageUrl: "/image/card-2.png" },
];

const ContinueCard = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <span className="text-2xl font-medium text-white">
          Continue Watching
        </span>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="rounded-lg shadow-lg"
      >
        {animeData.map((anime) => (
          <SwiperSlide key={anime.id}>
            <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
              <Image
                src={anime.imageUrl}
                alt={anime.title}
                width={250}
                height={120} // Reduced height for a rectangular shape
                className="w-full h-32 object-cover" // Adjusted height for CSS
              />
              <div className="p-2">
                <h3 className="text-lg font-bold">{anime.title}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContinueCard;
