import { Song } from "@/types";
import { create } from "zustand";

interface PlayerStore {
  songs: Song[];
  activeSong?: Song;
  setActiveSong: (song: Song) => void;
  setSongs: (songs: Song[]) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  songs: [],
  activeSong: undefined,
  setActiveSong: (song: Song) => set({ activeSong: song }),
  setSongs: (songs: Song[]) => set({ songs: songs }),
  reset: () => set({ songs: [], activeSong: undefined }),
}));
export default usePlayer;
