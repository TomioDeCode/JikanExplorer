/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface AnimeData {
  mal_id: number;
  title: string;
  imageUrl: string;
}

const RekomendCard = () => {
  const [animeData, setAnimeData] = useState<AnimeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnimeData = async (retryCount = 0, maxRetries = 3) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/anime`);

      if (response.status === 429) {
        if (retryCount < maxRetries) {
          const retryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff
          console.warn(`Retrying in ${retryDelay / 1000} seconds...`);
          setTimeout(() => fetchAnimeData(retryCount + 1), retryDelay);
          return;
        } else {
          throw new Error("Too many requests. Please try again later.");
        }
      }

      if (!response.ok) {
        throw new Error("Failed to fetch anime data");
      }

      const data = await response.json();
      const formattedData = data.data.slice(0, 9).map((item: any) => ({
        mal_id: item.mal_id,
        title: item.title,
        imageUrl: item.images.jpg.image_url,
      }));

      setAnimeData(formattedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimeData(); // Fetch data when the component mounts
  }, []);

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
            <Image
              src={imageUrl}
              alt={title}
              width={200}
              height={300}
              className="w-full h-[300px] object-fill"
            />
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
