// components/RecordLyrics.tsx
"use client";
import React, { useState, useRef } from "react";
import Button from "@/components/Button";
import { FaTrash, FaCaretDown, FaCaretUp } from "react-icons/fa";

interface RecordLyricsProps {
  // Include any props that might be needed, such as callback functions or data
}

const RecordLyrics: React.FC<RecordLyricsProps> = (props) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<Array<string>>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startRecording = () => {
    // Logic to start recording
    setIsRecording(true);
  };

  const stopRecording = () => {
    // Logic to stop recording and save the recording
    setIsRecording(false);
    // Dummy data to represent a recording
    setRecordings((prev) => [...prev, "new-recording-url"]);
  };

  const playRecording = (recordingUrl: string) => {
    if (audioRef.current) {
      audioRef.current.src = recordingUrl;
      audioRef.current.play();
    }
  };

  const deleteRecording = (index: number) => {
    setRecordings((prev) => prev.filter((_, i) => i !== index));
  };

  const recordingButtonClasses = isRecording
    ? "additional-class-for-recording"
    : "additional-class-for-not-recording";

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
            <Button
              className={recordingButtonClasses}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </Button>
          </div>
          <div>
            {recordings.map((recording, index) => (
              <div key={index} className="flex items-center gap-2">
                <Button onClick={() => playRecording(recording)}>
                  Play Recording {index + 1}
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
      <audio ref={audioRef} />
    </div>
  );
};

export default RecordLyrics;
