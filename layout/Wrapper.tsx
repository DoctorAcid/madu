"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // 1. Listen for route changes — scroll to top / hash, then resize so Lenis
  //    picks up the new page's scroll height (avoids getting stuck on short pages).
  useEffect(() => {
    const hash = window.location.hash; // e.g. "#vaasthira"

    if (!hash) {
      lenisRef.current?.scrollTo(0, { immediate: true });
    }

    // After the page transition enter animation (~1 s) the new page is fully
    // painted — resize so Lenis recalculates document dimensions, then scroll
    // to the hash target if present.
    const id = setTimeout(() => {
      lenisRef.current?.resize();

      if (hash) {
        const target = document.querySelector(hash);
        if (target && lenisRef.current) {
          lenisRef.current.scrollTo(target as HTMLElement, { duration: 1.2 });
        }
      }
    }, 1200);

    return () => clearTimeout(id);
  }, [pathname]);

  // 2. Main Lenis Setup Loop
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(5, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });
    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Wrapper;
