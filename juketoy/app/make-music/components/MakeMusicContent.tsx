"use client";
import React, { useState, useRef } from "react";
import Button from "@/components/Button";
import { FaTrash } from "react-icons/fa";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import RecordLyrics from "./RecordLyrics";
import MakeBeats from "./MakeBeats";

const MakeMusicContent: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<Array<string>>([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div>
      {/* Other content */}
      <RecordLyrics />
      {/* Other content */}
      <MakeBeats />
      {/* Other content */}
    </div>
  );
};

export default MakeMusicContent;
