"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FaPlay,
  FaStop,
  FaTrash,
  FaVolumeUp,
  FaVolumeMute,
  FaGithubAlt,
} from "react-icons/fa";

import styles from "../styles/styles.module.css";
import resetStyles from "../styles/reset.module.css";

import useSound from "use-sound";

const BeatMaker = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(150);
  const [activePads, setActivePads] = useState(new Set());

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
  console.log(currentKick, currentSnare, currentHihat);

  const kickAudio = useRef<HTMLAudioElement | null>(null);
  const snareAudio = useRef<HTMLAudioElement | null>(null);
  const hihatAudio = useRef<HTMLAudioElement | null>(null);

  const soundOptions = {
    kick: { sound: currentKick, name: "Kick Sound" },
    snare: { sound: currentSnare, name: "Snare Sound" },
    hihat: { sound: currentHihat, name: "Hi-hat Sound" },
  };

  useEffect(() => {
    // Existing code to initialize audio elements
    if (typeof Audio !== "undefined") {
      kickAudio.current = new Audio(currentKick);
      snareAudio.current = new Audio(currentSnare);
      hihatAudio.current = new Audio(currentHihat);
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
  }, [currentKick, currentSnare, currentHihat, activePads, bpm, isPlaying]); // Updated dependencies list

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

  // useEffect(() => {
  //   const fetchSoundNames = async () => {
  //     const filenames = await fetchSoundFilenames();
  //     // Now you have an array of sound filenames in the 'filenames' variable
  //     console.log(filenames);
  //     // You can set this array in your state or use it directly to create sound options
  //   };

  //   fetchSoundNames();
  // }, []); // Make sure to add any dependencies if needed

  // // Function to fetch sound filenames from the public/assets/sounds directory
  // const fetchSoundFilenames = () => {
  //   try {
  //     const soundDirectory = path.join(
  //       process.cwd(),
  //       "public",
  //       "assets",
  //       "sounds"
  //     );
  //     const filenames = fs
  //       .readdirSync(soundDirectory)
  //       .filter((filename) => filename.endsWith(".wav")); // Adjust the file extension as needed

  //     console.log(filenames);
  //     return filenames;
  //   } catch (error) {
  //     console.error("Error fetching sound filenames:", error);
  //     return [];
  //   }
  // };

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
    stepIndex.current = 0;
    // Reset the audio time as well if needed
    if (kickAudio.current) kickAudio.current.currentTime = 0;
    if (snareAudio.current) snareAudio.current.currentTime = 0;
    if (hihatAudio.current) hihatAudio.current.currentTime = 0;
  };

  const playBeat = () => {
    const step = stepIndex.current % 8;
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
    stepIndex.current++;
  };

  const togglePad = (track: "kick" | "snare" | "hihat", index: number) => {
    const padId = `${track}-pad-${index}`;
    setActivePads((prev) => {
      const newPads = new Set(prev);
      if (newPads.has(padId)) {
        newPads.delete(padId);
      } else {
        newPads.add(padId);
      }
      return newPads;
    });

    // Play the sound associated with the clicked pad
    playSound(track); // Call the playSound function with the track parameter
  };

  // This function is called when a pad is clicked
  const renderPads = (track: "kick" | "snare" | "hihat") => {
    return Array.from({ length: 8 }, (_, i) => (
      <div
        key={`${track}-pad-${i}`}
        className={`w-12 h-12 m-1 rounded-md cursor-pointer ${
          activePads.has(`${track}-pad-${i}`) ? "bg-red-500" : "bg-gray-200"
        }`}
        onClick={() => togglePad(track, i)}
      />
    ));
  };

  type SoundOption = {
    name: string;
    file: string; // Assuming the file is a string path to the sound file
  };

  const trackControls = (
    trackName: "kick" | "snare" | "hihat",
    soundOptions: SoundOption[],
    muteStatus: boolean
  ) => {
    return (
      <div className="flex items-center justify-between">
        {/* Sound selector dropdown */}
        <select
          className="bg-gray-200 text-black rounded-lg p-2"
          onChange={(e) => {
            const selectedSound = e.target.value;
            changeTrackSound(trackName, selectedSound); // Call a function to change the track sound
          }}
          value={getSelectedSound(trackName)} // Set the selected value based on the current sound
        >
          {soundOptions.map((sound, idx) => (
            <option key={idx} value={sound.file}>
              {sound.name}
            </option>
          ))}
        </select>

        {/* Mute button */}
        <button
          className={`p-2 ml-4 ${muteStatus ? "bg-red-500" : "bg-gray-300"}`}
          onClick={() => {
            muteTrack(trackName); // Call a function to mute the track
          }}
        >
          {muteStatus ? <FaVolumeMute /> : <FaVolumeUp />}
        </button>
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

  // More event handlers and logic as per your original JS file

  return (
    <div className="bg-white text-black font-lato">
      <nav className="shadow-lg py-4">
        <h1 className="text-center text-3xl font-bold">BeatMaker App</h1>
      </nav>

      <div className="flex flex-col items-center justify-center mt-20">
        {/* Kick track */}
        <div className="flex items-center w-full justify-start my-4">
          <div className="flex flex-1 justify-between items-center mx-8">
            {/* ... Kick track controls */}
            {/* {trackControls("kick", kickSounds, isMuted.kick)} */}
          </div>
          <div className="flex">{renderPads("kick")}</div>
        </div>

        {/* Snare track */}
        <div className="flex items-center w-full justify-start my-4">
          <div className="flex flex-1 justify-between items-center mx-8">
            {/* ... Snare track controls */}
            {/* {trackControls("snare", snareSounds, isMuted.snare)} */}
          </div>
          <div className="flex">{renderPads("snare")}</div>
        </div>

        {/* Hihat track */}
        <div className="flex items-center w-full justify-start my-4">
          <div className="flex flex-1 justify-between items-center mx-8">
            {/* ... Hihat track controls */}
            {/* {trackControls("hihat", hihatSounds, isMuted.hihat)} */}
          </div>
          <div className="flex">{renderPads("hihat")}</div>
        </div>
      </div>

      {/* Controls bar now moved under the pads and not fixed */}
      <div className="py-4 bg-white">
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
            onClick={() => {
              /* reset logic */
            }}
            className="mx-2 p-2 border-4 border-black rounded-full"
          >
            <FaTrash size={24} />
          </button>
          <a
            href="https://github.com/DevPadd"
            target="_blank"
            className="mx-2 p-2 border-4 border-black rounded-full"
          >
            <FaGithubAlt size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BeatMaker;
