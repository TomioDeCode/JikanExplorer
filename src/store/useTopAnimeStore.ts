/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface Anime {
  mal_id: number;
  title: string;
  imageUrl: string;
}

interface TopAnimeStore {
  topAnime: Anime[];
  loading: boolean;
  error: string | null;
  fetchTopAnime: (retryCount?: number) => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useTopAnimeStore = create<TopAnimeStore>((set) => ({
  topAnime: [],
  loading: true,
  error: null,
  fetchTopAnime: async (retryCount = 0) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/top/anime`);

      if (response.status === 429) {
        if (retryCount < 3) {
          const retryDelay = Math.pow(2, retryCount) * 1000;
          console.warn(`Retrying in ${retryDelay / 1000} seconds...`);

          setTimeout(() => {
            useTopAnimeStore.getState().fetchTopAnime(retryCount + 1);
          }, retryDelay);
          return;
        } else {
          throw new Error("Too many requests. Please try again later.");
        }
      }

      if (!response.ok) {
        throw new Error("Failed to fetch top anime");
      }

      const data = await response.json();
      const animeData = data.data.slice(0, 4).map((item: any) => ({
        mal_id: item.mal_id,
        title: item.title,
        imageUrl: item.images.jpg.image_url,
      }));

      set({ topAnime: animeData });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "An error occurred" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useTopAnimeStore;
