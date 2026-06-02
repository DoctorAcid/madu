"use client";

import { useEffect, useRef } from "react";
import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
  trigger?: "mount" | "scroll";
  /** Split animation by individual letters or whole words */
  splitBy?: "letters" | "words";
  className?: string;
  delay?: number;
  /** Per-unit animation duration in seconds */
  duration?: number;
  /** Time between each unit's start (randomised order) */
  stagger?: number;
}

const TextReveal = ({
  children,
  className,
  trigger = "scroll",
  splitBy = "letters",
  delay = 0,
  duration = 0.8,
  stagger = 0.018,
}: TextRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const text =
    typeof children.props.children === "string" ? children.props.children : "";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const units = Array.from(
      container.querySelectorAll<HTMLElement>("[data-char]"),
    );

    const order = units.map((_, i) => i).sort(() => Math.random() - 0.5);

    const animate = () => {
      order.forEach((unitIdx, position) => {
        gsap.set(units[unitIdx], { opacity: 0 });
        gsap.fromTo(
          units[unitIdx],
          { y: "40%" },
          {
            y: "0%",
            opacity: 1,
            duration,
            ease: "power3.out",
            delay: delay + position * stagger,
          },
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
      gsap.killTweensOf(units);
    };
  }, [text, trigger, splitBy, delay, duration, stagger]);

  const words = text.split(" ");

  const animatedContent =
    splitBy === "words"
      ? words.map((word, wordIdx) => (
          <React.Fragment key={wordIdx}>
            {/* Clip container per word */}
            <span
              className="inline-block overflow-hidden"
              style={{ verticalAlign: "bottom", lineHeight: "inherit" }}
            >
              <span
                data-char
                className="inline-block whitespace-nowrap"
                style={{
                  lineHeight: "inherit",
                  transform: "translateY(40%)",
                  opacity: 0,
                }}
              >
                {word}
              </span>
            </span>
            {wordIdx < words.length - 1 && (
              <span className="inline-block" style={{ width: "0.3em" }} />
            )}
          </React.Fragment>
        ))
      : // Default: split by letters, grouped per word for natural line-breaking
        words.map((word, wordIdx) => (
          <React.Fragment key={wordIdx}>
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="inline-block"
                  style={{ verticalAlign: "bottom", lineHeight: "inherit" }}
                >
                  <span
                    data-char
                    className="inline-block"
                    style={{
                      lineHeight: "inherit",
                      transform: "translateY(40%)",
                      opacity: 0,
                    }}
                  >
                    {char}
                  </span>
                </span>
              ))}
            </span>
            {wordIdx < words.length - 1 && (
              <span className="inline-block" style={{ width: "0.3em" }} />
            )}
          </React.Fragment>
        ));

  const mergedClassName =
    [children.props.className, className].filter(Boolean).join(" ") ||
    undefined;

  return React.cloneElement(children, {
    ref: containerRef,
    "aria-label": text,
    className: mergedClassName,
    children: animatedContent,
  } as React.HTMLAttributes<HTMLElement> & { ref: React.Ref<HTMLElement> });
};

export default TextReveal;
