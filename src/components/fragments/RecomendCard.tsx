"use client";

import React from "react";
import Image from "next/image";

interface AnimeData {
  id: number;
  title: string;
  imageUrl: string;
}

const animeData: AnimeData[] = [
  { id: 1, title: "One Piece", imageUrl: "/image/card.png" },
  { id: 2, title: "Naruto", imageUrl: "/image/card-1.png" },
  { id: 3, title: "Attack on Titan", imageUrl: "/image/card-2.png" },
  { id: 4, title: "My Hero Academia", imageUrl: "/image/card-1.png" },
  { id: 5, title: "Demon Slayer", imageUrl: "/image/card-2.png" },
  { id: 6, title: "Death Note", imageUrl: "/image/card.png" },
];

const RekomendCard = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-4">
        <span className="text-2xl font-medium text-white">For You</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {animeData.map((anime) => (
          <div
            key={anime.id}
            className="bg-gray-900 text-white rounded-lg overflow-hidden"
          >
            <Image
              src={anime.imageUrl}
              alt={anime.title}
              width={200}
              height={300}
              className="w-full h-auto object-cover"
            />
            <div className="p-2">
              <h3 className="text-lg font-bold">{anime.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RekomendCard;
