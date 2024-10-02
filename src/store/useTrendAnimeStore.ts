/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface AnimeData {
  id: number;
  title: string;
  imageUrl: string;
  url: string;
}

interface TrendAnimeStore {
  animeData: AnimeData[];
  loading: boolean;
  error: string | null;
  fetchRecommendedAnime: (
    retryCount?: number,
    maxRetries?: number
  ) => Promise<void>;
}

export const useTrendAnimeStore = create<TrendAnimeStore>((set, get) => ({
  animeData: [],
  loading: true,
  error: null,
  fetchRecommendedAnime: async (retryCount = 0, maxRetries = 3) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/recommendations/anime`
      );

      if (response.status === 429) {
        if (retryCount < maxRetries) {
          const retryDelay = Math.pow(2, retryCount) * 1000;
          console.warn(`Retrying in ${retryDelay / 1000} seconds...`);
          setTimeout(() => {
            get().fetchRecommendedAnime(retryCount + 1, maxRetries);
          }, retryDelay);
          return;
        } else {
          throw new Error("Too many requests. Please try again later.");
        }
      }

      if (!response.ok) {
        throw new Error("Failed to fetch recommended anime data");
      }

      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        const recommendations = data.data;
        const formattedData: AnimeData[] = recommendations
          .flatMap((recommendation: any) =>
            recommendation.entry.map((anime: any) => ({
              id: anime.mal_id,
              title: anime.title,
              imageUrl: anime.images.jpg.image_url,
              url: anime.url,
            }))
          )
          .slice(0, 10);

        set({ animeData: formattedData, loading: false, error: null });
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "An error occurred",
        loading: false,
      });
    }
  },
}));
