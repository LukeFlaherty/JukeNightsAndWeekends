"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaStop,
  FaTrash,
  FaVolumeUp,
  FaVolumeMute,
  FaGithubAlt,
  FaPlus,
  FaCaretDown,
  FaCaretUp,
} from "react-icons/fa";

import useSound from "use-sound";

import useGetDefaultSounds from "@/hooks/useGetDefaultSounds";
import Dropdown from "./DropDown";
import { CustomTrack } from "@/types";

const BeatMaker = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(150);
  const [activePads, setActivePads] = useState(new Set());
  const [isCollapsed, setIsCollapsed] = useState(false);

  // for tracking what is playing for transform
  const [currentStep, setCurrentStep] = useState(0);

  const [currentAllSound, setCurrentAllSound] = useState("");
  const [dynamicTracks, setDynamicTracks] = useState<DynamicTrack[]>([]);

  // Get the default sounds
  const { sounds, loading } = useGetDefaultSounds();

  // Mute state for each track
  const [isMuted, setIsMuted] = useState({
    kick: false,
    snare: false,
    hihat: false,
  });

  const [currentKick, setCurrentKick] = useState(
    `./assets/sounds/kick-classic.wav`
  );
  const [currentSnare, setCurrentSnare] = useState(
    `./assets/sounds/snare-lofi01.wav`
  );
  const [currentHihat, setCurrentHihat] = useState(
    `./assets/sounds/hihat-808.wav`
  );

  const kickAudio = useRef<HTMLAudioElement | null>(null);
  const snareAudio = useRef<HTMLAudioElement | null>(null);
  const hihatAudio = useRef<HTMLAudioElement | null>(null);
  const allSoundsAudio = useRef<HTMLAudioElement | null>(null);

  type TrackName = "kick" | "snare" | "hihat";
  type Track = "kick" | "snare" | "hihat" | "allSounds" | DynamicTrack;

  type DynamicTrack = {
    id: number;
    sound: string;
    name: string;
  };

  const trackNames: TrackName[] = ["kick", "snare", "hihat"];

  const soundOptions = {
    kick: { sound: currentKick, name: "Kick Sound" },
    snare: { sound: currentSnare, name: "Snare Sound" },
    hihat: { sound: currentHihat, name: "Hi-hat Sound" },
    allSounds: { sound: currentAllSound, name: "All Sounds" }, // New entry
  };

  useEffect(() => {
    // Existing code to initialize audio elements
    if (typeof Audio !== "undefined") {
      kickAudio.current = new Audio(currentKick);
      snareAudio.current = new Audio(currentSnare);
      hihatAudio.current = new Audio(currentHihat);
    }

    if (typeof Audio !== "undefined") {
      allSoundsAudio.current = new Audio(currentAllSound);
      console.log("Initialized allSoundsAudio with:", currentAllSound);
    }

    // Clear existing interval
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }

    // Set new interval if playing
    if (isPlaying) {
      intervalId.current = setInterval(playBeat, (60 / bpm) * 1000);
    }

    // Cleanup function
    return () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [
    currentKick,
    currentSnare,
    currentHihat,
    currentAllSound,
    activePads,
    bpm,
    isPlaying,
  ]); // Updated dependencies list

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  let stepIndex = useRef(0);

  // Use useSound for each track
  const [playKick, { pause: pauseKick }] = useSound(soundOptions.kick.sound, {
    volume: isMuted.kick ? 0 : 1, // Adjust the volume based on mute status
    interrupt: true, // Allow interrupting the sound when it's played again
  });

  const [playSnare, { pause: pauseSnare }] = useSound(
    soundOptions.snare.sound,
    {
      volume: isMuted.snare ? 0 : 1,
      interrupt: true,
    }
  );

  const [playHihat, { pause: pauseHihat }] = useSound(
    soundOptions.hihat.sound,
    {
      volume: isMuted.hihat ? 0 : 1,
      interrupt: true,
    }
  );

  const addDynamicTrack = () => {
    const newTrack: DynamicTrack = {
      id: Date.now(),
      sound: "", // Default sound
      name: "New Track", // Default name
    };
    setDynamicTracks([...dynamicTracks, newTrack]);
  };

  // Function to remove a dynamic track by id
  const removeDynamicTrack = (trackId: number) => {
    setDynamicTracks((prevTracks) =>
      prevTracks.filter((track) => track.id !== trackId)
    );
  };

  const updateTrackSound = (trackId: number, newSoundUrl: any) => {
    setDynamicTracks(
      dynamicTracks.map((track) => {
        if (track.id === trackId) {
          return { ...track, sound: newSoundUrl };
        }
        return track;
      })
    );
  };

  // Function to handle playing the sounds
  const playSound = (track: "kick" | "snare" | "hihat") => {
    if (track === "kick") {
      playKick();
    } else if (track === "snare") {
      playSnare();
    } else if (track === "hihat") {
      playHihat();
    }
  };

  const startStop = () => {
    if (isPlaying) {
      if (intervalId.current) clearInterval(intervalId.current);
      setIsPlaying(false);
    } else {
      intervalId.current = setInterval(playBeat, (60 / bpm) * 1000);
      setIsPlaying(true);
      playBeat(); // Start immediately
    }
  };

  // Implement the reset functionality
  const reset = () => {
    setActivePads(new Set());
    setIsPlaying(false); // Stop the loop
    setBpm(150); // Reset BPM to initial value or any default you prefer
    stepIndex.current = 0;

    // Reset the audio time
    if (kickAudio.current) kickAudio.current.currentTime = 0;
    if (snareAudio.current) snareAudio.current.currentTime = 0;
    if (hihatAudio.current) hihatAudio.current.currentTime = 0;

    // Optional: Reset sound selections to their default values
    setCurrentKick(`./assets/sounds/kick-classic.wav`);
    setCurrentSnare(`./assets/sounds/snare-lofi01.wav`);
    setCurrentHihat(`./assets/sounds/hihat-808.wav`);
  };

  const playBeat = () => {
    const step = stepIndex.current % 8;
    setCurrentStep(step); // Update the current step state

    // Logic to play the beat based on active pads
    if (activePads.has(`kick-pad-${step}`) && kickAudio.current) {
      kickAudio.current.currentTime = 0;
      kickAudio.current.play();
    }
    if (activePads.has(`snare-pad-${step}`) && snareAudio.current) {
      snareAudio.current.currentTime = 0;
      snareAudio.current.play();
    }
    if (activePads.has(`hihat-pad-${step}`) && hihatAudio.current) {
      hihatAudio.current.currentTime = 0;
      hihatAudio.current.play();
    }
    // Logic for allSounds track
    if (activePads.has(`allSounds-pad-${step}`) && allSoundsAudio.current) {
      allSoundsAudio.current.currentTime = 0;
      allSoundsAudio.current.play();
    }

    // Debugging for allSounds track
    if (activePads.has(`allSounds-pad-${step}`)) {
      console.log("Trying to play sound on allSounds track:", currentAllSound);
      if (allSoundsAudio.current) {
        console.log("Audio element is present");
        allSoundsAudio.current.currentTime = 0;
        allSoundsAudio.current.play();
      } else {
        console.log("Audio element is not initialized");
      }
    }

    stepIndex.current++;
  };

  const togglePad = (trackId: string, index: number) => {
    const padId = `${trackId}-pad-${index}`;
    setActivePads((prev) => {
      const newPads = new Set(prev);
      if (newPads.has(padId)) {
        newPads.delete(padId);
      } else {
        newPads.add(padId);
      }
      return newPads;
    });

    // Play the sound immediately for the "allSounds" track
    if (trackId === "allSounds" && allSoundsAudio.current) {
      allSoundsAudio.current.currentTime = 0;
      allSoundsAudio.current.play();
    }

    // Existing logic for other tracks...
    if (trackId === "kick" || trackId === "snare" || trackId === "hihat") {
      playSound(trackId as "kick" | "snare" | "hihat");
    }
  };

  // This function is called when a pad is clicked
  const renderPads = (track: Track) => {
    const trackId = typeof track === "string" ? track : track.id.toString();

    return Array.from({ length: 8 }, (_, i) => {
      let baseClasses =
        "w-12 h-12 m-1 rounded-md cursor-pointer transition duration-150 ";

      const isActive = activePads.has(`${trackId}-pad-${i}`);
      baseClasses += isActive ? "bg-red-500" : "bg-gray-200";
      if (currentStep === i) {
        baseClasses += " scale-110"; // Tailwind classes for active step
      }

      return (
        <div
          key={`${trackId}-pad-${i}`}
          className={baseClasses}
          onClick={() => togglePad(trackId, i)}
        />
      );
    });
  };

  // Updated trackControls function
  const trackControls = (trackName: TrackName, muteStatus: boolean) => {
    const soundOptions = sounds.filter(
      (sound) => sound.type_of_sound === trackName
    );
    const selectedSound = getSelectedSound(trackName);

    return (
      <div className="flex items-center justify-between">
        <Dropdown
          options={soundOptions} // Ensure soundOptions is an array of Sound objects
          selectedValue={selectedSound}
          onChange={(newSoundUrl) => changeTrackSound(trackName, newSoundUrl)}
        />
        {/* Mute button */}
        {/* ... Mute button logic ... */}
      </div>
    );
  };

  // Function to change the track sound based on trackName and selectedSound
  const changeTrackSound = (
    trackName: "kick" | "snare" | "hihat",
    selectedSound: string
  ) => {
    switch (trackName) {
      case "kick":
        setCurrentKick(selectedSound);
        break;
      case "snare":
        setCurrentSnare(selectedSound);
        break;
      case "hihat":
        setCurrentHihat(selectedSound);
        break;
      default:
        break;
    }
  };

  // Function to get the currently selected sound for the track
  const getSelectedSound = (trackName: "kick" | "snare" | "hihat") => {
    switch (trackName) {
      case "kick":
        return currentKick;
      case "snare":
        return currentSnare;
      case "hihat":
        return currentHihat;
      default:
        return "";
    }
  };

  // Function to mute/unmute the track based on trackName
  const muteTrack = (trackName: "kick" | "snare" | "hihat") => {
    setIsMuted((prev) => ({
      ...prev,
      [trackName]: !prev[trackName],
    }));
  };

  const updateBpm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBpm = parseInt(e.target.value, 10); // Convert string to number
    setBpm(newBpm);
    if (isPlaying) {
      startStop(); // Restart the beat with new BPM
      startStop();
    }
  };

  return (
    <div className="text-black font-lato p-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Make a Beat</h2>
        <div onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <FaCaretDown /> : <FaCaretUp />}
        </div>
      </div>

      {!isCollapsed && (
        <>
          <div className="flex flex-col items-center justify-center mt-0">
            {trackNames.map((track) => (
              <div
                className="flex items-center w-full justify-start my-4"
                key={track}
              >
                <div className="flex flex-1 justify-between items-center mx-8">
                  {trackControls(track, isMuted[track])}
                </div>
                <div className="flex">{renderPads(track)}</div>
              </div>
            ))}

            {/* UI for the "allSounds" track */}
            <div className="flex items-center w-full justify-start my-4">
              <div className="flex flex-1 justify-between items-center mx-8">
                {/* Dropdown for selecting a sound for the "allSounds" track */}
                <Dropdown
                  options={sounds} // Ensure this lists all available sounds
                  selectedValue={currentAllSound}
                  onChange={(newSoundUrl) => {
                    console.log(
                      "Selected sound for allSounds track:",
                      newSoundUrl
                    );
                    setCurrentAllSound(newSoundUrl);
                  }}
                />
                {/* Add any additional controls you might need here */}
              </div>
              <div className="flex">
                {/* Render pads for the "allSounds" track */}
                {renderPads("allSounds")}
              </div>
            </div>

            {/* Render dynamic tracks */}
            {dynamicTracks.map((track) => (
              <div
                className="flex items-center w-full justify-start my-4"
                key={track.id}
              >
                <div className="flex flex-1 justify-between items-center mx-8">
                  {/* Dropdown for selecting a sound */}
                  <Dropdown
                    options={sounds}
                    selectedValue={track.sound}
                    onChange={(newSoundUrl) =>
                      updateTrackSound(track.id, newSoundUrl)
                    }
                  />
                  {/* Delete button */}
                  <button onClick={() => removeDynamicTrack(track.id)}>
                    <FaTrash />
                  </button>
                </div>
                <div className="flex">
                  {/* Render pads */}
                  {renderPads(track)}
                </div>
              </div>
            ))}

            <button
              onClick={addDynamicTrack}
              className="my-4 p-2 bg-blue-500 text-white hover:bg-blue-700 rounded"
            >
              <FaPlus /> Add Track
            </button>
          </div>

          {/* Controls bar */}
          <div className="py-4">
            <div className="flex justify-center items-center">
              <button
                onClick={startStop}
                className="mx-2 p-2 border-4 border-black rounded-full"
              >
                {isPlaying ? <FaStop size={24} /> : <FaPlay size={24} />}
              </button>
              <div className="flex items-center mx-2">
                <h2 className="text-xl mr-2">
                  <span className="text-2xl font-bold">{bpm}</span> BPM
                </h2>
                <input
                  type="range"
                  className="w-1/2"
                  min="30"
                  max="240"
                  value={bpm}
                  onChange={updateBpm}
                />
              </div>
              <button
                onClick={reset}
                className="mx-2 p-2 border-4 border-black rounded-full"
              >
                <FaTrash size={24} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BeatMaker;
