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
  { id: 3, title: "Attack on Titan", imageUrl: "/image/attack-on-titan.png" },
  { id: 4, title: "My Hero Academia", imageUrl: "/image/my-hero-academia.png" },
];

const TrendCard = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <span className="text-2xl font-medium text-white">Recomended</span>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="max-w-3xl mx-auto"
      >
        {animeData.map((anime) => (
          <SwiperSlide key={anime.id}>
            <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
              <Image
                src={anime.imageUrl}
                alt={anime.title}
                width={800}
                height={200}
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{anime.title}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendCard;
