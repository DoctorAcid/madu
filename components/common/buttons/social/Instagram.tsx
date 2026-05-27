"use client";

import InstagramSvg from "@/public/assets/svg/InstagramSvg";
import Link from "next/link";
import React from "react";

interface InstagramProps {
  className?: string;
  size?: number;
}

const Instagram = ({ size, className }: InstagramProps) => {
  return (
    <Link href={"#"} className="group flex items-center justify-center p-3">
      <InstagramSvg size={size} className={className} />
    </Link>
  );
};

export default Instagram;
