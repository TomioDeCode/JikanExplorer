import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

interface AnimeData {
  id: number;
  title: string;
  imageUrl: string;
}

const animeData: AnimeData[] = [
  { id: 1, title: "One Piece", imageUrl: "/image/one-peace.png" },
  { id: 2, title: "Naruto", imageUrl: "/image/naruto.png" },
  { id: 3, title: "My Hero Academia", imageUrl: "/image/card.png" },
];

const TopCard = () => {
  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto">
      <div className="mb-3">
        <h2 className="text-2xl font-semibold text-white">Top Anime</h2>
      </div>
      <div className="space-y-4">
        {animeData.map((anime) => (
          <div
            key={anime.id}
            className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg shadow-sm"
          >
            <Image
              src={anime.imageUrl}
              alt={anime.title}
              className="w-16 h-16 object-cover rounded-md"
              width={100}
              height={200}
            />
            <div>
              <h3 className="text-lg font-semibold text-white">
                {anime.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      {/* Read More Button */}
      <div className="mt-4 text-center">
        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
          Read More
        </Button>
      </div>
    </div>
  );
};

export default TopCard;
