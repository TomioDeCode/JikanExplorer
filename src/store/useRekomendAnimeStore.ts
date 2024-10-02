/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface AnimeData {
  mal_id: number;
  title: string;
  imageUrl: string;
}

interface RekomendAnimeStore {
  animeData: AnimeData[];
  loading: boolean;
  error: string | null;
  fetchAnimeData: (retryCount?: number, maxRetries?: number) => void;
}

const useRekomendAnimeStore = create<RekomendAnimeStore>((set) => ({
  animeData: [],
  loading: true,
  error: null,
  fetchAnimeData: async (retryCount = 0, maxRetries = 3) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/anime`);

      if (response.status === 429) {
        if (retryCount < maxRetries) {
          const retryDelay = Math.pow(2, retryCount) * 1000;
          console.warn(`Retrying in ${retryDelay / 1000} seconds...`);
          setTimeout(() => {
            useRekomendAnimeStore
              .getState()
              .fetchAnimeData(retryCount + 1, maxRetries);
          }, retryDelay);
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

      set({ animeData: formattedData, loading: false, error: null });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "An error occurred",
        loading: false,
      });
    }
  },
}));

export default useRekomendAnimeStore;
