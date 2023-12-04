// components/RecordLyrics.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import { FaTrash, FaCaretDown, FaCaretUp } from "react-icons/fa";

const RecordLyrics = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<string[]>([]); // Specify the type as string[]
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [countdown, setCountdown] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  let audioChunks: BlobPart[] = []; // Specify the type for audioChunks
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const startCountdown = () => {
    setCountdown(3);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout; // Use 'number' instead if in a browser environment
    if (countdown > 0) {
      timeoutId = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && isRecording) {
      startRecording();
    }
    return () => clearTimeout(timeoutId); // Clear timeout if component unmounts
  }, [countdown, isRecording]);

  const startRecording = async () => {
    if (countdown === 0) {
      // Get stream from user's microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Initialize MediaRecorder
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;

      recorder.ondataavailable = (event) => audioChunks.push(event.data);
      // Start recording
      recorder.start();
      // Handle stopping
      recorder.onstop = () => {
        // Create a blob with the audio data
        const audioBlob = new Blob(audioChunks, { type: "audio/mpeg" });
        // Generate a URL for the blob
        const recordingUrl = URL.createObjectURL(audioBlob);
        // Save the recording URL
        setRecordings((prev) => [...prev, recordingUrl]);
        // Clean up the stream
        stream.getTracks().forEach((track) => track.stop());
      };
    }
  };

  const stopRecording = () => {
    // Stop the recording and reset countdown
    recorderRef.current?.stop();
    setIsRecording(false);
    setCountdown(0); // Reset countdown
    stopPlayback(); // Stop playback if it's playing

    // Stop each track on the stream
    if (recorderRef.current && recorderRef.current.stream) {
      recorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
  };

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlayingIndex(null); // Reset the playing index
    }
  };

  const handlePlaybackEnd = () => {
    setPlayingIndex(null); // Reset the playing index when playback ends
  };

  const playRecording = (recordingUrl: string, index: number) => {
    if (audioRef.current) {
      audioRef.current.src = recordingUrl;
      audioRef.current.play();
      setPlayingIndex(index); // Set the currently playing index
    }
  };

  const deleteRecording = (index: number) => {
    stopPlayback(); // Stop playback if it's playing
    setRecordings((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Record Lyrics</h2>
        <div onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <FaCaretDown /> : <FaCaretUp />}
        </div>
      </div>
      {!isCollapsed && (
        <div>
          <div className="mb-4">
            {countdown > 0 ? (
              <div className="bg-blue-100 p-4 rounded-md text-blue-900">
                <p className="font-bold">Countdown: {countdown}</p>
                <p className="text-sm">
                  If this is your first time, you will have to allow Microphone
                  access.
                </p>
                <Button
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4"
                  onClick={() => stopRecording()}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                className={`mt-2 ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white font-bold py-2 px-4 rounded`}
                onClick={() => {
                  if (isRecording) {
                    stopRecording();
                  } else {
                    setIsRecording(true);
                    startCountdown();
                  }
                }}
              >
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
            )}
          </div>
          <div>
            {recordings.map((recording, index) => (
              <div key={index} className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    if (playingIndex === index) {
                      stopPlayback();
                    } else {
                      playRecording(recording, index);
                    }
                  }}
                  className={`mt-2 ${
                    playingIndex === index
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white font-bold py-2 px-4 rounded`}
                >
                  {playingIndex === index
                    ? "Stop Playback"
                    : `Play Recording ${index + 1}`}
                </Button>
                <FaTrash
                  className="cursor-pointer"
                  onClick={() => deleteRecording(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <audio ref={audioRef} onEnded={handlePlaybackEnd} />
    </div>
  );
};

export default RecordLyrics;
