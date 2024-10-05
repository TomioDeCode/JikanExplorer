"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useRekomendAnimeStore from "@/store/useRekomendAnimeStore";

const RekomendCard = () => {
  const { animeData, loading, error, fetchAnimeData } = useRekomendAnimeStore();

  useEffect(() => {
    if (animeData.length === 0) {
      fetchAnimeData();
    }
  }, [animeData.length, fetchAnimeData]);

  const truncateTitle = (title: string, maxLength: number) =>
    title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;

  if (loading) return <p className="text-white">Loading anime data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <span className="text-2xl font-medium text-white">For You</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {animeData.map(({ mal_id, title, imageUrl }) => (
          <div
            key={mal_id}
            className="bg-gray-900 text-white rounded-lg overflow-hidden"
          >
            <Link href={`/anime/${mal_id}`}>
              <Image
                src={imageUrl}
                alt={title}
                width={200}
                height={300}
                className="w-full h-[300px] object-fill"
              />
            </Link>
            <div className="p-2">
              <h3 className="text-lg font-bold">{truncateTitle(title, 15)}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RekomendCard;
