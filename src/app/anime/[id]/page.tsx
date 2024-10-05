/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const AnimeDetail = ({ params }: { params: { id: string } }) => {
  const [animeDetail, setAnimeDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime/${params.id}/full`
        );
        console.log(response)
        if (!response.ok) {
          throw new Error("Failed to fetch anime details");
        }
        const data = await response.json();
        console.log(data)
        setAnimeDetail(data.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
        console.log(err)
      }
    };

    fetchAnimeDetail();
  }, [params.id]);

  if (loading) return <p>Loading anime details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!animeDetail) return <p>No anime found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex">
        <Image
          src={animeDetail.images.jpg.large_image_url}
          alt={animeDetail.title}
          width={300}
          height={450}
          className="object-cover rounded-lg"
        />
        <div className="ml-6">
          <h1 className="text-3xl font-bold text-white mb-4">
            {animeDetail.title}
          </h1>
          <p className="text-white mb-2">
            <strong>Episodes:</strong> {animeDetail.episodes}
          </p>
          <p className="text-white mb-2">
            <strong>Status:</strong> {animeDetail.status}
          </p>
          <p className="text-white mb-2">
            <strong>Rating:</strong> {animeDetail.rating}
          </p>
          <p className="text-white mb-2">
            <strong>Synopsis:</strong> {animeDetail.synopsis}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
