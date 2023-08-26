import { create } from "zustand";

interface useSelectPlaylistModal {
  isOpen: boolean;
  onOpen: (songId: string) => void;
  onClose: () => void;
  setSongId: (songId: string) => void; // add this
  songId: string;
}

const useSelectPlaylistModal = create<useSelectPlaylistModal>((set) => ({
  isOpen: false,
  songId: "",
  onOpen: (songId: string) => set({ isOpen: true, songId }), // set songId here
  onClose: () => set({ isOpen: false, songId: "" }), // reset songId to an empty string upon closing, optional
  setSongId: (songId: string) => set({ songId }), // setter for songId
}));

export default useSelectPlaylistModal;
