"use client";

import React from "react";

interface Props {
  email: string;
}

const SectionEmail: React.FC<Props> = ({ email }) => {
  return (
    <div className="bg-hoverColor p-4 rounded-lg">
      <h3 className="font-medium text-lg mb-2 text-white">Admin</h3>
      <p>{email}</p>
    </div>
  );
};

export default SectionEmail;
