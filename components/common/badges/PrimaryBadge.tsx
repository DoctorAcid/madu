"use client";

import React from "react";

interface PrimaryBadgeProps {
  text: string;
}

const PrimaryBadge = ({ text }: PrimaryBadgeProps) => {
  return (
    <div className="w-fit h-fit accent-text flex items-center justify-center px-4 py-2 text-primary-2 bg-white rounded-full">
      {text}
    </div>
  );
};

export default PrimaryBadge;
