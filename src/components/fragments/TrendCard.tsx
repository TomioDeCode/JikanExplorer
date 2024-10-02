/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";

interface AnimeData {
  id: number;
  title: string;
  imageUrl: string;
  url: string;
}

const TrendCard = () => {
  const [animeData, setAnimeData] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendedAnime = async (retryCount = 0, maxRetries = 3) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recommendations/anime`
      );

      if (response.status === 429) {
        if (retryCount < maxRetries) {
          const retryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s, etc.
          console.warn(`Retrying in ${retryDelay / 1000} seconds...`);
          setTimeout(() => fetchRecommendedAnime(retryCount + 1), retryDelay);
          return;
        } else {
          throw new Error("Too many requests. Please try again later.");
        }
      }

      if (!response.ok) {
        throw new Error("Failed to fetch recommended anime data");
      }

      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        const recommendations = data.data;
        const formattedData: AnimeData[] = recommendations
          .flatMap((recommendation: any) =>
            recommendation.entry.map((anime: any) => ({
              id: anime.mal_id,
              title: anime.title,
              imageUrl: anime.images.jpg.image_url,
              url: anime.url,
            }))
          )
          .slice(0, 10);

        setAnimeData(formattedData);
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendedAnime(); // Initial fetch
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
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
