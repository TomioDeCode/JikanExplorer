"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import useTopMovieStore from "@/store/useTopMovieStore";

const TopMovieCard = () => {
  const { topMovies, loading, error, fetchTopMovies } = useTopMovieStore();

  useEffect(() => {
    if (topMovies.length === 0) {
      fetchTopMovies();
    }
  }, [topMovies, fetchTopMovies]);

  if (loading) {
    return <p className="text-white">Loading top movies...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-3">Top Movies</h2>
      <div className="space-y-4">
        {topMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
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

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    imageUrl: string;
  };
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const truncatedTitle = movie.title.length > 20
    ? movie.title.substring(0, 20) + "..."
    : movie.title;

  return (
    <div className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg shadow-sm">
      <Image
        src={movie.imageUrl}
        alt={movie.title}
        className="w-[40px] h-[40px] object-cover rounded-md"
        width={40}
        height={40}
      />
      <h3 className="text-lg font-semibold text-white">{truncatedTitle}</h3>
    </div>
  );
};

export default TopMovieCard;
