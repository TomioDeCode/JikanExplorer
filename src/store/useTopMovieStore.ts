/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface Movie {
  id: number;
  title: string;
  imageUrl: string;
}

interface TopMovieStore {
  topMovies: Movie[];
  loading: boolean;
  error: string | null;
  fetchTopMovies: (retryCount?: number) => Promise<void>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const useTopMovieStore = create<TopMovieStore>((set) => ({
  topMovies: [],
  loading: true,
  error: null,
  fetchTopMovies: async (retryCount = 0) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/anime?type=movie`);

      if (response.status === 429) {
        if (retryCount < 3) {
          const retryDelay = Math.pow(2, retryCount) * 1000;
          console.warn(`Retrying in ${retryDelay / 1000} seconds...`);

          setTimeout(() => {
            useTopMovieStore.getState().fetchTopMovies(retryCount + 1);
          }, retryDelay);
          return;
        } else {
          throw new Error("Too many requests. Please try again later.");
        }
      }

      if (!response.ok) {
        throw new Error("Failed to fetch top movies");
      }

      const data = await response.json();
      const movieData = data.data.slice(0, 6).map((item: any) => ({
        id: item.id,
        title: item.title,
        imageUrl: item.images.jpg.image_url,
      }));

      set({ topMovies: movieData });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "An error occurred" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useTopMovieStore;
