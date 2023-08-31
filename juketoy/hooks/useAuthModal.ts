import { create } from "zustand";

interface AuthModalStore {
  isOpen: boolean;
  actionType: "login" | "signup";
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  actionType: "login",
  onOpenLogin: () => set({ isOpen: true, actionType: "login" }),
  onOpenSignup: () => set({ isOpen: true, actionType: "signup" }),
  onClose: () => set({ isOpen: false }),
}));

export default useAuthModal;
