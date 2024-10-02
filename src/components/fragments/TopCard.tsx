/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface Anime {
  mal_id: number;
  title: string;
  imageUrl: string;
}

const TopCard = () => {
  const [topAnime, setTopAnime] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTopAnime = async (retryCount = 0, maxRetries = 3) => {
    try {
      const response = await fetch(`${API_URL}/top/anime`);

      if (response.status === 429) {
        if (retryCount < maxRetries) {
          const retryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff
          console.warn(`Retrying in ${retryDelay / 1000} seconds...`);
          setTimeout(() => fetchTopAnime(retryCount + 1), retryDelay);
          return;
        } else {
          throw new Error("Too many requests. Please try again later.");
        }
      }

      if (!response.ok) {
        throw new Error("Failed to fetch top anime");
      }

      const data = await response.json();
      const animeData = data.data.slice(0, 3).map((item: any) => ({
        mal_id: item.mal_id,
        title: item.title,
        imageUrl: item.images.jpg.image_url,
      }));

      setTopAnime(animeData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopAnime(); // Initial fetch
  }, []);

  if (loading) {
    return <p className="text-white">Loading top anime...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-3">Top Anime</h2>
      <div className="space-y-4">
        {topAnime.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
      <div className="mt-4 text-center">
        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
          Read More
        </Button>
      </div>
    </div>
  );
};

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg shadow-sm">
      <Image
        src={anime.imageUrl}
        alt={anime.title}
        className="w-[40px] h-[40px] object-cover rounded-md"
        width={40}
        height={40}
      />
      <h3 className="text-lg font-semibold text-white">{anime.title}</h3>
    </div>
  );
};

export default TopCard;
