"use client";

import gsap from "gsap";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import LogoHeader from "@/components/common/logo/LogoHeader";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/#services", label: "Services" },
];

const Header = () => {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Hero intersection observer — home page only
  useEffect(() => {
    if (pathname !== "/") return;
    const hero = document.getElementById("hero-section");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(entry.boundingClientRect.bottom < 0),
      { threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // GSAP open / close animation
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(menu, { display: "flex" });
      gsap
        .timeline()
        .fromTo(
          menu,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, ease: "power2.out" },
        )
        .fromTo(
          menu.querySelectorAll("[data-item]"),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.1",
        );
    } else {
      document.body.style.overflow = "";
      gsap.to(menu, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
  }, [menuOpen]);

  // Restore scroll on unmount
  useEffect(
    () => () => {
      document.body.style.overflow = "";
    },
    [],
  );

  const useDarkNav = pastHero || pathname !== "/";

  const linkClass = useDarkNav
    ? "text-primary-2 hover:text-primary-1"
    : "text-primary-3 hover:text-primary-5";

  const underlineClass = useDarkNav ? "bg-primary-1" : "bg-primary-3";
  const burgerColor = useDarkNav ? "bg-primary-2" : "bg-primary-3";

  return (
    <>
      <nav className="z-400 fixed top-0 left-0 right-0 w-full">
        <div className="w-full max-w-[1920px] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <LogoHeader pastHero={useDarkNav} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-20">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`group/nav relative button-text transition-colors duration-300 ease-out ${linkClass}`}
              >
                {label}
                <span
                  className={`absolute bottom-0 left-0 w-0 group-hover/nav:w-full h-0.5 transition-all ease-out duration-300 ${underlineClass}`}
                />
              </Link>
            ))}
            <PrimaryButton href="/contact">Let&apos;s Talk</PrimaryButton>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-6 h-0.5 transition-all duration-300 origin-center ${burgerColor} ${
                menuOpen ? "rotate-45 translate-y-[8px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 ${burgerColor} ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 transition-all duration-300 origin-center ${burgerColor} ${
                menuOpen ? "-rotate-45 -translate-y-[8px]" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        ref={menuRef}
        style={{ display: "none" }}
        className="fixed inset-0 z-[100] bg-primary-5 flex-col items-center justify-center gap-12 md:hidden"
      >
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            data-item
            onClick={() => setMenuOpen(false)}
            className="h3 text-primary-1 hover:text-primary-2 transition-colors duration-200"
          >
            {label}
          </Link>
        ))}
        <div data-item>
          <PrimaryButton href="/contact">Let&apos;s Talk</PrimaryButton>
        </div>
      </div>
    </>
  );
};

export default Header;
