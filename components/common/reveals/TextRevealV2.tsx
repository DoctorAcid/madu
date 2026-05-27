"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealV2Props {
  children: React.ReactNode;
  /** Delay before the first line starts */
  delay?: number;
  /** Gap between each line's sweep start */
  lineDelay?: number;
  /** Total duration per line (split equally across in + out phases) */
  duration?: number;
  /** Tailwind bg class for the wiper colour */
  highlightColor?: string;
  trigger?: "scroll" | "mount";
  className?: string;
}

const TextRevealV2 = ({
  children,
  delay = 0,
  lineDelay = 0.8,
  duration = 0.7,
  highlightColor = "bg-primary-1",
  trigger = "scroll",
  className,
}: TextRevealV2Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wiperRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const texts = textRefs.current.filter(Boolean) as HTMLDivElement[];
    const wipers = wiperRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!container || !texts.length || !wipers.length) return;

    const half = duration / 2;

    const animate = () => {
      texts.forEach((text, i) => {
        const wiper = wipers[i];
        if (!wiper) return;

        const tl = gsap.timeline({ delay: delay + i * lineDelay });

        // Phase 1 — wiper sweeps in from the left, covering the line
        tl.to(wiper, {
          x: "0%",
          ease: "power2.in",
          duration: half,
        });

        // Phase 2 — wiper exits to the right; text is revealed simultaneously
        tl.to(wiper, { x: "105%", ease: "power2.out", duration: half });
        tl.to(
          text,
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "power2.out",
            duration: half,
          },
          "<", // synced with wiper exit
        );
      });
    };

    if (trigger === "scroll") {
      ScrollTrigger.create({
        trigger: container,
        start: "top 85%",
        once: true,
        onEnter: animate,
      });
    } else {
      animate();
    }

    return () => {
      ScrollTrigger.getAll()
        .filter((st) => st.vars.trigger === container)
        .forEach((st) => st.kill());
      gsap.killTweensOf([...texts, ...wipers]);
    };
  }, [delay, lineDelay, duration, trigger]);

  const lines = React.Children.toArray(children);

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, i) => (
        // w-fit shrinks the container to the text content width so the
        // wiper (absolute inset-0) never extends into empty space
        <div key={i} className="relative w-fit overflow-hidden">
          {/* Text hidden initially via clip-path; revealed as wiper exits */}
          <div
            ref={(el) => { textRefs.current[i] = el; }}
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            {line}
          </div>

          {/* Each line gets its own wiper; starts off-screen left */}
          <div
            ref={(el) => { wiperRefs.current[i] = el; }}
            aria-hidden="true"
            style={{ transform: "translateX(-105%)" }}
            className={`pointer-events-none absolute inset-0 z-10 ${highlightColor}`}
          />
        </div>
      ))}
    </div>
  );
};

export default TextRevealV2;
