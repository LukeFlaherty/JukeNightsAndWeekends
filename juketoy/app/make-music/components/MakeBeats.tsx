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

  const kickAudio = useRef<HTMLAudioElement | null>(null);
  const snareAudio = useRef<HTMLAudioElement | null>(null);
  const hihatAudio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // This code will only run in the browser
    if (typeof Audio !== "undefined") {
      kickAudio.current = new Audio(currentKick);
      snareAudio.current = new Audio(currentSnare);
      hihatAudio.current = new Audio(currentHihat);
    }
  }, [currentKick, currentSnare, currentHihat]);

  const intervalId = useRef<NodeJS.Timeout | null>(null);
  let stepIndex = useRef(0);

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
  };

  // This function is called when a pad is clicked
  const renderPads = (track: "kick" | "snare" | "hihat") => {
    return Array.from({ length: 8 }, (_, i) => (
      <div
        key={`${track}-pad-${i}`}
        className={`${styles.pad} ${track}-pad ${
          activePads.has(`${track}-pad-${i}`) ? styles.active : ""
        }`}
        onClick={() => togglePad(track, i)}
      />
    ));
  };

  const muteTrack = (track: "kick" | "snare" | "hihat") => {
    setIsMuted((prev) => ({ ...prev, [track]: !prev[track] }));
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
    <div className={styles.beatMaker}>
      <nav className={`${styles.topBar} top-bar`}>
        <h1>BeatMaker App</h1>
      </nav>

      <div className={`${styles.sequencer} sequencer`}>
        {/* Kick track */}
        <div className={`${styles.kickTrack} kick-track`}>
          <div className={`${styles.trackControl} track-control`}>
            {/* ... Kick track controls */}
          </div>
          <div className={`${styles.kick} kick`}>{renderPads("kick")}</div>
        </div>

        {/* Snare track */}
        <div className={`${styles.snareTrack} snare-track`}>
          <div className={`${styles.trackControl} track-control`}>
            {/* ... Snare track controls */}
          </div>
          <div className={`${styles.snare} snare`}>{renderPads("snare")}</div>
        </div>

        {/* Hihat track */}
        <div className={`${styles.hihatTrack} hihat-track`}>
          <div className={`${styles.trackControl} track-control`}>
            {/* ... Hihat track controls */}
          </div>
          <div className={`${styles.hihat} hihat`}>{renderPads("hihat")}</div>
        </div>
      </div>

      <nav className={`${styles.controlsBar} controls-bar`}>
        <button onClick={startStop} className={styles.controlButton}>
          {isPlaying ? <FaStop /> : <FaPlay />}
        </button>
        <div className={`${styles.tempo} tempo`}>
          <h2>
            <span className={`${styles.tempoNumber} tempo-number`}>{bpm}</span>{" "}
            BPM
          </h2>
          <input
            type="range"
            className={`${styles.tempoSlider} tempo-slider`}
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
          className={styles.controlButton}
        >
          <FaTrash />
        </button>
        <a
          href="https://github.com/DevPadd"
          target="_blank"
          className={styles.controlButton}
        >
          <FaGithubAlt />
        </a>
      </nav>
    </div>
  );
};

export default BeatMaker;
