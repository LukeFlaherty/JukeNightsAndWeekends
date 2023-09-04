import { Song } from "@/types";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import usePlayer from "./usePlayer";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpenLogin();
    }

    const songToPlay = songs.find((song) => song.id === id);
    if (songToPlay) {
      player.setActiveSong(songToPlay);
      player.setSongs(songs);
    }
  };
  return onPlay;
};

export default useOnPlay;
