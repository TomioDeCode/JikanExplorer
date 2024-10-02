"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useAnimeStore from "@/store/useAnimeStore";

const SearchMain = () => {
  const {
    animeData,
    loading,
    error,
    currentPage,
    searchTerm,
    setCurrentPage,
    setSearchTerm,
    fetchAnimeData,
  } = useAnimeStore();

  const itemsPerPage = 6;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (animeData.length === 0) {
      fetchAnimeData();
    }
  }, [animeData.length, fetchAnimeData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setCurrentPage(1);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fetchAnimeData(searchValue);
    }, 500);
  };

  const totalPages = Math.ceil(animeData.length / itemsPerPage);
  const currentData = animeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading)
    return (
      <p className="text-white text-center text-lg">Loading...</p>
    );
  if (error) return <p className="text-red-500 text-center text-lg">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search anime..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full mr-4 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div className="flex items-center">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-700 text-white p-2 rounded-l hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-gray-700 text-white p-2 rounded-r hover:bg-gray-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {currentData.map(({ mal_id, title, imageUrl }, index) => (
          <div
            key={`${mal_id}-${index}`}
            className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <div className="relative flex items-center justify-center mt-5">
              <Image
                src={imageUrl}
                alt={title}
                width={1000}
                height={1000}
                className="transition-opacity duration-300 hover:opacity-75 h-[250px] w-[200px]"
                priority
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMain;
