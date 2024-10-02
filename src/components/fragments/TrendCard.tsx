/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useTrendAnimeStore } from "@/store/useTrendAnimeStore";

const TrendCard = () => {
  const { animeData, loading, error, fetchRecommendedAnime } =
    useTrendAnimeStore();

  useEffect(() => {
    fetchRecommendedAnime();
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  if (loading) {
    return <p className="text-white">Loading recommended anime...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <span className="text-2xl font-medium text-white">Recommended</span>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        className="max-w-3xl mx-auto"
      >
        {animeData.map((anime) => (
          <SwiperSlide key={anime.id}>
            <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
              <Image
                src={anime.imageUrl}
                alt={anime.title}
                width={200}
                height={400}
                className="w-full h-[250px] object-cover"
              />
              <div className="p-4">
                <h2 className="text-base font-bold">
                  {truncateText(anime.title, 6)}
                </h2>{" "}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendCard;
