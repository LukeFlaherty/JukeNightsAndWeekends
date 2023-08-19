"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  //   dont load player if there is not song or songUrl or activeId
  if (!song || !songUrl || !player.activeId) return null;

  return (
    <div className="fixed bottom-0 bg-lightModeBackground w-full py-2 h-[80px] px-4">
      {/* use key to destroy whole element everytime song is changed via skip and stuff */}
      {/* reset hook bc player does not support dynamic url changes make my own eventually */}
      <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default Player;
