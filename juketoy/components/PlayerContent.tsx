"use client";

import { Song } from "@/types";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import Slider from "./Slider";
import { useEffect, useState } from "react";
import usePlayer from "@/hooks/usePlayer";

import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
  onDeleteSong: (id: string) => void;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
  song,
  songUrl,
  onDeleteSong,
}) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.songs.length === 0) {
      return;
    }
    const currentIndex = player.songs.findIndex(
      (s) => s.id === player.activeSong?.id
    );
    const nextSong = player.songs[currentIndex + 1];

    // if we are at the last song and hit next it loops
    if (!nextSong) {
      return player.setActiveSong(player.songs[0]);
    }
    player.setActiveSong(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.songs.length === 0) {
      return;
    }
    const currentIndex = player.songs.findIndex(
      (s) => s.id === player.activeSong?.id
    );
    const previousSong = player.songs[currentIndex - 1];

    // loads the last song from the array
    if (!previousSong) {
      return player.setActiveSong(player.songs[player.songs.length - 1]);
    }
    player.setActiveSong(previousSong);
  };

  // this is what cant change dynamically so we had to use the key to reload component
  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} onDelete={onDeleteSong} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
      </div>

      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillStepBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-pastelBrandColor cursor-pointer h-10 w-10 rounded-full hover:mainBrandColor transition"
        />
        <div
          onClick={handlePlay}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-mainBrandColor p-1 cursor-pointer"
        >
          <Icon size={30} className="text-white" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-pastelBrandColor cursor-pointer h-10 w-10 rounded-full hover:mainBrandColor transition"
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer text-mainBrandColor"
            size={34}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
