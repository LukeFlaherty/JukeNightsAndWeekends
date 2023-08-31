"use client";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import { useEffect, useState } from "react";
import CreatePlaylistModal from "@/components/CreatePlaylistModal";
import SelectPlaylistModal from "@/components/SelectPlaylistModal";
import { Playlist, Song } from "@/types";
import useSelectPlaylistModal from "@/hooks/useSelectPlaylistModal";

interface ModalProviderProps {
  playlists: Playlist[];
  songs: Song[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ playlists, songs }) => {
  const [isMounted, setIsMounted] = useState(false);

  const selectPlaylistModal = useSelectPlaylistModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <UploadModal />
      <CreatePlaylistModal />
      <SelectPlaylistModal
        playlists={playlists}
        isOpen={selectPlaylistModal.isOpen}
        onClose={() => selectPlaylistModal.onClose()}
        songs={songs}
        songId={selectPlaylistModal.songId}
      />
    </>
  );
};

export default ModalProvider;
