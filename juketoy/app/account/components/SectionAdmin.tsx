"use client";

import React from "react";

interface Props {
  is_admin: boolean | undefined;
}

const SectionAdmin: React.FC<Props> = ({ is_admin }) => {
  return (
    <div className="bg-hoverColor p-4 rounded-lg">
      <h3 className="font-medium text-lg mb-2 text-white">Admin</h3>
      <p>{is_admin ? "Yes" : "No"}</p>
    </div>
  );
};

export default SectionAdmin;
