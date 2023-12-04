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

const BeatMaker = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(150);
  const [activePads, setActivePads] = useState(new Set());
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [trackLength, setTrackLength] = useState(8);

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

  type AudioElements = {
    [key: number]: HTMLAudioElement;
  };

  const trackNames: TrackName[] = ["kick", "snare", "hihat"];

  const soundOptions = {
    kick: { sound: currentKick, name: "Kick Sound" },
    snare: { sound: currentSnare, name: "Snare Sound" },
    hihat: { sound: currentHihat, name: "Hi-hat Sound" },
    allSounds: { sound: currentAllSound, name: "All Sounds" }, // New entry
  };

  const dynamicTrackAudios = useRef<AudioElements>({});

  useEffect(() => {
    dynamicTracks.forEach((track) => {
      if (track.sound) {
        dynamicTrackAudios.current[track.id] = new Audio(track.sound);
      }
    });

    return () => {
      // Cleanup audio elements if needed
    };
  }, [dynamicTracks]);

  useEffect(() => {
    // Existing code to initialize audio elements
    if (typeof Audio !== "undefined") {
      kickAudio.current = new Audio(currentKick);
      snareAudio.current = new Audio(currentSnare);
      hihatAudio.current = new Audio(currentHihat);
    }

    if (typeof Audio !== "undefined") {
      allSoundsAudio.current = new Audio(currentAllSound);
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

  const addExtraBeat = () => {
    setTrackLength((currentLength) => currentLength + 1);
  };

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
          // Update the audio element for this track
          dynamicTrackAudios.current[trackId] = new Audio(newSoundUrl);
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
    const step = stepIndex.current % trackLength;
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

    // Logic for dynamic tracks
    dynamicTracks.forEach((track) => {
      if (
        activePads.has(`${track.id}-pad-${step}`) &&
        dynamicTrackAudios.current[track.id]
      ) {
        dynamicTrackAudios.current[track.id].currentTime = 0;
        dynamicTrackAudios.current[track.id].play();
      }
    });

    stepIndex.current = (stepIndex.current + 1) % trackLength; // Cycle through the current number of steps
  };

  const togglePad = (trackId: string | number, index: number) => {
    if (!isNaN(Number(trackId))) {
      trackId = Number(trackId);
    }

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

    // Play the sound for dynamic tracks
    if (typeof trackId === "number" && dynamicTrackAudios.current[trackId]) {
      dynamicTrackAudios.current[trackId].currentTime = 0;
      dynamicTrackAudios.current[trackId].play();
    }

    // Play the sound for predefined tracks
    if (typeof trackId === "string" && trackId !== "allSounds") {
      playSound(trackId as "kick" | "snare" | "hihat");
    }
  };

  // This function is called when a pad is clicked
  const renderPads = (track: Track) => {
    const trackId =
      typeof track === "object" && track !== null ? track.id : track;

    return Array.from({ length: trackLength }, (_, i) => {
      let baseClasses =
        "w-12 h-12 m-1 rounded-md cursor-pointer transition duration-150 flex-shrink-0 min-w-12 ";

      const isActive = activePads.has(`${trackId}-pad-${i}`);
      baseClasses += isActive ? "bg-red-500" : "bg-gray-200";
      if (currentStep === i) {
        baseClasses += " scale-110"; // Tailwind classes for active step
      }

      baseClasses += " hover:scale-125"; // This will scale up the pad to 125% on hover

      return (
        <div
          key={`${trackId}-pad-${i}`}
          className={baseClasses}
          onClick={() =>
            togglePad(
              typeof trackId === "number" ? trackId : trackId.toString(),
              i
            )
          }
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
          {/* Main container for controls and pads with flex and align-items-start */}
          <div className="flex w-full items-start">
            {/* Container for all track controls with a specified max-height */}
            <div className="w-1/3 mr-4 overflow-y-auto">
              {trackNames.map((track) => (
                <div className="flex flex-col mb-4" key={track}>
                  <div className="text-lg font-semibold mb-2">
                    {track.toUpperCase()}
                  </div>
                  {trackControls(track, isMuted[track])}
                </div>
              ))}
              {/* UI for the "allSounds" track */}
              <div className="flex flex-col mb-4">
                <div className="text-lg font-semibold mb-2">ALL SOUNDS</div>
                <Dropdown
                  options={sounds}
                  selectedValue={currentAllSound}
                  onChange={(newSoundUrl) => setCurrentAllSound(newSoundUrl)}
                />
              </div>

              {/* Render dynamic tracks */}
              <div className="flex flex-col mb-4">
                {dynamicTracks.map((track) => (
                  <div key={track.id}>
                    {/* This will render "CUSTOM TRACK" above the dropdown */}
                    <div className="text-lg font-semibold mb-2">
                      CUSTOM TRACK
                    </div>
                    <div className="flex items-center justify-start mb-4">
                      <div className="flex flex-grow">
                        <Dropdown
                          options={sounds}
                          selectedValue={track.sound}
                          onChange={(newSoundUrl) =>
                            updateTrackSound(track.id, newSoundUrl)
                          }
                        />
                      </div>
                      <button
                        className="ml-4 flex-none" // This adds a margin to the left of the delete button and prevents it from shrinking
                        onClick={() => removeDynamicTrack(track.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Container for all pads */}
            <div className="w-2/3 flex flex-col overflow-x-auto">
              {/* Consistent margin for all pads */}
              <div className="flex flex-col space-y-10">
                {trackNames.map((track) => (
                  <div className="flex items-center mt-8 mb-0" key={track}>
                    <div className="flex">{renderPads(track)}</div>
                  </div>
                ))}

                {/* Pads for the "allSounds" track */}
                <div className="flex items-center mb-8">
                  {renderPads("allSounds")}
                </div>

                {/* Pads for dynamic tracks */}
                {dynamicTracks.map((track) => (
                  <div className="flex items-center " key={track.id}>
                    {renderPads(track)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Container for "Add Track" and "Add Extra Beat" buttons */}
          <div className="flex justify-center my-4">
            <button
              onClick={addDynamicTrack}
              className="mx-2 p-2 bg-blue-500 text-white hover:bg-blue-700 rounded"
            >
              <FaPlus /> Add Track
            </button>

            <button
              onClick={addExtraBeat}
              className="mx-2 p-2 bg-blue-500 text-white hover:bg-blue-700 rounded"
            >
              <FaPlus /> Add Extra Beat
            </button>
          </div>

          {/* Controls bar */}
          <div className="py-4 flex justify-center items-center">
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
        </>
      )}
    </div>
  );
};

export default BeatMaker;
