"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

interface ContentRevealProps {
  children: React.ReactNode;
  start?: number;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
}

const ContentReveal = ({
  children,
  start = 40,
  delay = 0,
  duration = 0.6,
  className = "",
  direction = "left",
}: ContentRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        filter: "blur(16px)",
        x: direction === "left" ? -start : direction === "right" ? start : 0,
        y: direction === "down" ? start : direction === "up" ? -start : 0,
      }}
      animate={isInView ? { opacity: 1, filter: "blur(0px)", x: 0, y: 0 } : {}}
      transition={{ delay, duration, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ContentReveal;
