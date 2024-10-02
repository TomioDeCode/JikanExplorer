/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { BiFilter } from "react-icons/bi";
import { Input } from "../ui/input"; // Asumsi Input adalah komponen custom
import React, { useState, useEffect, ChangeEvent } from "react";

interface Anime {
  mal_id: number;
  title: string;
}

const InputBox = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Anime[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchAnime = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/anime?q=${searchQuery}`);

      if (response.status === 429) {
        setError("Too many requests. Please try again later.");
        return;
      }

      const data = await response.json();
      setResults(data.data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 2) {
        setShowOverlay(true);
        fetchAnime(query);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false); // Tutup overlay
  };

  return (
    <div className="relative flex flex-col items-center space-y-4 p-4 bg-gray-900 rounded-lg shadow-lg max-w-md transition-all duration-300 ease-in-out">
      <div className="flex items-center space-x-3 w-full">
        <Input
          className="flex-1 p-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          placeholder="Search anime..."
          value={query}
          onChange={handleInputChange}
        />
        <button className="p-3 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300">
          <BiFilter size={24} />
        </button>
      </div>

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {showOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
          onClick={handleOverlayClose}
        >
          <div
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-[400px] max-h-[400px] overflow-y-auto transform transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-lg font-semibold">
                Search Results
              </h2>
              <button
                className="text-white hover:text-red-500 focus:outline-none transition-all duration-300"
                onClick={handleOverlayClose}
              >
                Close
              </button>
            </div>
            <div>
              {results.length > 0 ? (
                <ul className="text-white space-y-2">
                  {results.slice(0, 5).map((anime) => (
                    <li
                      key={anime.mal_id}
                      className="bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-600"
                    >
                      {anime.title}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white">No results found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InputBox;
