/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface Anime {
  mal_id: number;
  title: string;
  imageUrl: string;
}

interface AnimeStore {
  animeData: Anime[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  searchTerm: string;
  fetchAnimeData: (searchTerm?: string, retryCount?: number) => Promise<void>;
  setAnimeData: (data: Anime[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentPage: (page: number) => void;
  setSearchTerm: (term: string) => void;
}

const useAnimeStore = create<AnimeStore>((set, get) => ({
  animeData: [],
  loading: true,
  error: null,
  currentPage: 1,
  searchTerm: "",

  setAnimeData: (data: Anime[]) => set({ animeData: data }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setCurrentPage: (page: number) => set({ currentPage: page }),
  setSearchTerm: (term: string) => set({ searchTerm: term }),

  fetchAnimeData: async (searchTerm = get().searchTerm, retryCount = 0) => {
    set({ loading: true });

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await fetch(`${API_URL}/anime?q=${searchTerm}`);

      if (response.status === 429) {
        if (retryCount < 5) {
          const delay = Math.pow(2, retryCount) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
          return get().fetchAnimeData(searchTerm, retryCount + 1);
        } else {
          throw new Error("Terlalu banyak permintaan. Coba lagi nanti.");
        }
      }

      if (!response.ok) throw new Error("Gagal mengambil data anime.");

      const data = await response.json();
      const formattedData = data.data.map((item: any) => ({
        mal_id: item.mal_id,
        title: item.title,
        imageUrl: item.images.jpg.image_url,
      }));
      set({ animeData: formattedData });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : "Terjadi kesalahan." });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useAnimeStore;
