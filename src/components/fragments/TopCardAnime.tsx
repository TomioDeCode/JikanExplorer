"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import useTopAnimeStore from "@/store/useTopAnimeStore";

const TopCard = () => {
  const { topAnime, loading, error, fetchTopAnime } = useTopAnimeStore();

  useEffect(() => {
    if (topAnime.length === 0) {
      fetchTopAnime();
    }
  }, [topAnime, fetchTopAnime]);

  if (loading) {
    return <p className="text-white">Loading top anime...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-3">Top Animes</h2>
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
  anime: {
    mal_id: number;
    title: string;
    imageUrl: string;
  };
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg shadow-sm">
      <Image
        src={anime.imageUrl}
        alt={anime.title}
        className="w-[40px] h-[40px] object-cover rounded-md"
        width={40}
        height={40}
      />
      <h3 className="text-lg font-semibold text-white">
        {truncateText(anime.title, 20)}
      </h3>{" "}
      {/* Truncate title here */}
    </div>
  );
};

export default TopCard;
