import { create } from "zustand";

interface useSelectPlaylistModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  songId?: string;
}

const useSelectPlaylistModal = create<useSelectPlaylistModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  songId: "Hello",
}));

export default useSelectPlaylistModal;
