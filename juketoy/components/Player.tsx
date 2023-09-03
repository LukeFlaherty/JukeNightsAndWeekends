"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeSong?.id);

  const songUrl = useLoadSongUrl(song!);

  //   don't load player if there is not song or songUrl or activeSong
  if (!song || !songUrl || !player.activeSong) return null;

  return (
    <div className="fixed bottom-0 bg-lightModeBackground w-full py-2 h-[80px] px-4">
      {/* use key to destroy whole element every time song is changed via skip and stuff */}
      {/* reset hook because player does not support dynamic URL changes; make my own eventually */}
      <PlayerContent
        key={songUrl}
        song={song}
        songUrl={songUrl}
        onDeleteSong={() => {}}
      />
    </div>
  );
};

export default Player;
