import { create } from "zustand";

interface useSelectPlaylistModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSelectPlaylistModal = create<useSelectPlaylistModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSelectPlaylistModal;
