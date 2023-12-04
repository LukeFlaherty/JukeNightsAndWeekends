"use client";
import React, { useState, useRef, useEffect } from "react";
import { Sound } from "@/types"; // Import the Sound interface

interface DropdownProps {
  options: Sound[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedSound = options.find(
    (option) => option.sound_url === selectedValue
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        className="w-full bg-gray-200 text-gray-700 py-3 pl-4 pr-10 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate flex-grow">
          {selectedSound ? selectedSound.name : "Select a sound"}
        </span>
        {/* Icon */}
        <svg
          className="fill-current h-4 w-4 transform transition-transform"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          style={{ transform: `rotate(${isOpen ? "180deg" : "0deg"})` }}
        >
          <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615l-4.695 4.502c-0.533 0.481-1.408 0.481-1.941 0l-4.695-4.502c-0.408-.418-0.436-1.17 0-1.615z" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded max-h-60 overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                selectedValue === option.sound_url ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                onChange(option.sound_url);
                setIsOpen(false);
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
