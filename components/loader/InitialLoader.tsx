"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const STORAGE_KEY = "initial_loaded";

// ── Odometer column data ───────────────────────────────────────────────────
// Each column scrolls continuously upward (y gets more negative as v grows).
// Position formula:  y = -floor(v / 10^n) × CELL_H
//   ones    → floor(v / 1)   needs positions 0–100  → 101 cells
//   tens    → floor(v / 10)  needs positions 0–10   → 11 cells
//   hundreds→ floor(v / 100) needs positions 0–1    → 10 cells (only 0 and 1 used)
const CELL_H = 80; // px — matches inline height style
const onesColumn = Array.from({ length: 101 }, (_, i) => i % 10);
const tensColumn = Array.from({ length: 11 }, (_, i) => i % 10);
const hundredsColumn = Array.from({ length: 10 }, (_, i) => i);

const InitialLoader = () => {
  const [isVisible, setIsVisible] = useState(true);

  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const counterWrapRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarWrapperRef = useRef<HTMLDivElement>(null);

  // Digit column inner-scroll refs
  const hundredsColRef = useRef<HTMLDivElement>(null);
  const tensColRef = useRef<HTMLDivElement>(null);
  const onesColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      // Production (setIsVisible → false): stamp the flag so PixelTrail
      // can detect it even if the canvas hasn't mounted yet, then signal
      // an instant reveal (duration 0 handled by the __loaderDone guard).
      // Testing (setIsVisible → true): loader still plays, onComplete fires instead.
      (window as typeof window & { __loaderDone?: boolean }).__loaderDone =
        true;
      window.dispatchEvent(new Event("loader:complete"));
      setIsVisible(false); // Change to false when testing is over
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const overlay = overlayRef.current;
    const logo = logoRef.current;
    const counterWrap = counterWrapRef.current;
    const progressBar = progressBarRef.current;
    const line = lineRef.current;
    const subtitle = subtitleRef.current;
    const panels = panelRefs.current.filter(Boolean) as HTMLDivElement[];
    const hundredsCol = hundredsColRef.current;
    const tensCol = tensColRef.current;
    const onesCol = onesColRef.current;
    const progressBarWrapper = progressBarWrapperRef.current;

    if (
      !overlay ||
      !logo ||
      !counterWrap ||
      !progressBar ||
      !line ||
      !subtitle ||
      !hundredsCol ||
      !tensCol ||
      !onesCol ||
      !progressBarWrapper
    )
      return;

    // ── Initial states ─────────────────────────────────────────────────────
    gsap.set([logo, counterWrap, line, subtitle, progressBarWrapper], {
      opacity: 0,
      y: 20,
    });
    gsap.set([hundredsCol, tensCol, onesCol], { y: 0 });
    gsap.set(progressBar, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(panels, { scaleY: 1, transformOrigin: "top center" });

    const counter = { val: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(STORAGE_KEY, "true");
        (window as typeof window & { __loaderDone?: boolean }).__loaderDone =
          true;
        window.dispatchEvent(new Event("loader:complete"));
        setIsVisible(false); // Change to false when testing is over
      },
    });

    // ── Enter (absolute positions so counter and UI sync precisely) ────────
    tl.to(
      [logo, progressBarWrapper],
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
      0,
    )
      .to(
        counterWrap,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.15,
      )
      .to(
        [line, subtitle],
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        1.0,
      );

    // ── Counter drives digit columns + progress bar ─────────────────────────
    // Starts at t=0 so it's already moving when the UI fades in.
    tl.to(
      counter,
      {
        val: 100,
        duration: 2.1,
        ease: "power2.inOut",
        onUpdate() {
          const v = Math.round(counter.val);

          // All three columns only ever move upward (more negative y = new digit from below)
          gsap.set(hundredsCol, { y: -Math.floor(v / 100) * CELL_H });
          gsap.set(tensCol, { y: -Math.floor(v / 10) * CELL_H });
          gsap.set(onesCol, { y: -v * CELL_H });

          // Progress bar uses raw (un-rounded) value for a silky smooth fill
          gsap.set(progressBar, { scaleX: counter.val / 100 });
        },
      },
      0,
    );

    // ── Exit ───────────────────────────────────────────────────────────────
    // Content slides up + fades
    tl.to(
      [logo, counterWrap, line, subtitle, progressBarWrapper],
      {
        opacity: 0,
        y: -18,
        duration: 0.32,
        stagger: 0.025,
        ease: "power2.in",
      },
      2.45,
    );

    // Panels retract upward (top edge fixed, bottom rises), staggered left-to-right
    tl.to(
      panels,
      {
        scaleY: 0,
        duration: 0.42,
        stagger: 0.07,
        ease: "power2.inOut",
      },
      2.62,
    );

    // Overlay sweeps up — catches any remaining background
    tl.to(
      overlay,
      {
        yPercent: -100,
        duration: 0.72,
        ease: "power4.inOut",
      },
      2.85,
    );

    return () => {
      tl.kill();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const digitCell = (d: number, i: number) => (
    <div
      key={i}
      className="flex items-center justify-center"
      style={{ height: CELL_H, width: 52 }}
    >
      <span
        className="leading-none font-semibold text-black-2"
        style={{ fontFamily: "var(--font-nohemi)", fontSize: 20 }}
      >
        {d}
      </span>
    </div>
  );

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
    >
      {/* ── Background: 4 cream panels (each retracts independently on exit) ── */}
      <div className="absolute inset-0 flex divide-x divide-black/10">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="w-1/4 h-full bg-primary-5"
          />
        ))}
      </div>

      {/* ── Content (z-10 so it sits above the panels) ─────────────────────── */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        {/* Logo */}
        <svg
          ref={logoRef}
          width="56"
          height="48"
          viewBox="0 0 28.8 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-10"
          aria-hidden="true"
        >
          <path
            d="M14.4004 8L7.2002 0H0V24H28.8008V0H21.6006L14.4004 8Z"
            fill="url(#il-g1)"
          />
          <path
            d="M0.000389099 24V0H7.20039L28.8004 24H0.000389099Z"
            fill="url(#il-g2)"
          />
          <defs>
            <linearGradient
              id="il-g1"
              x1="14.4"
              y1="0"
              x2="14.4"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FCB7A5" />
              <stop offset="1" stopColor="#F74C1F" />
            </linearGradient>
            <linearGradient
              id="il-g2"
              x1="14.4"
              y1="0"
              x2="14.4"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FCB7A5" />
              <stop offset="1" stopColor="#F9704C" />
            </linearGradient>
          </defs>
        </svg>

        {/* ── Odometer + progress (share the same container width) ─────────── */}
        <div style={{ width: 200 }} className="absolute bottom-0">
          {/* Counter: three digit columns + % sign */}
          <div ref={counterWrapRef} className="flex items-end justify-center">
            {/* Hundreds */}
            <div className="overflow-hidden" style={{ height: CELL_H }}>
              <div ref={hundredsColRef} className="">
                {hundredsColumn.map(digitCell)}
              </div>
            </div>

            {/* Tens */}
            <div className="overflow-hidden" style={{ height: CELL_H }}>
              <div ref={tensColRef}>{tensColumn.map(digitCell)}</div>
            </div>

            {/* Ones */}
            <div className="overflow-hidden" style={{ height: CELL_H }}>
              <div ref={onesColRef}>{onesColumn.map(digitCell)}</div>
            </div>

            {/* Percent */}
            {/* <span
              className="font-semibold text-dark-gray-1 self-end mb-2 ml-1"
              style={{ fontFamily: "var(--font-nohemi)", fontSize: 16 }}
            >
              %
            </span> */}
          </div>
        </div>
        {/* Progress bar: track + animated fill */}
        <div
          ref={progressBarWrapperRef}
          className="hidden absolute top-4 left-1/2 -translate-x-1/2 mt-4 w-full overflow-hidden"
          style={{ height: 1.5, background: "#FDDBD2" }}
        >
          <div
            ref={progressBarRef}
            className="h-full bg-primary-1 origin-left"
          />
        </div>

        {/* ── Divider ──────────────────────────────────────────────────────── */}
        <div
          ref={lineRef}
          className="hidden mt-8 origin-center"
          style={{ height: 1, width: 200, background: "#F9704C" }}
        />

        {/* ── Caption ──────────────────────────────────────────────────────── */}
        <p
          ref={subtitleRef}
          className="hidden mt-4 text-xs tracking-[0.28em] uppercase text-primary-3"
          style={{ fontFamily: "var(--font-nohemi)" }}
        >
          Design Portfolio
        </p>
      </div>
    </div>
  );
};

export default InitialLoader;
