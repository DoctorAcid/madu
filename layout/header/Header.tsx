"use client";

import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import LogoHeader from "@/components/common/logo/LogoHeader";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;

    const hero = document.getElementById("hero-section");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPastHero(entry.boundingClientRect.bottom < 0);
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  const useDarkNav = pastHero || pathname !== "/";

  const linkClass = useDarkNav
    ? "text-primary-2 hover:text-primary-1"
    : "text-primary-3 hover:text-primary-5";

  const underlineClass = useDarkNav ? "bg-primary-1" : "bg-primary-3";

  return (
    <nav className="z-999 fixed top-0 left-0 right-0 w-full">
      <div className="w-full max-w-[1920px] mx-auto px-20 py-6 flex items-center justify-between">
        {/* LOGO */}
        <div className="">
          <Link href="/">
            <LogoHeader pastHero={useDarkNav} />
          </Link>
        </div>

        {/* NAVS */}
        <div className="flex items-center gap-20">
          <Link
            href="/work"
            className={`group/work relative button-text transition-colors duration-300 ease-out ${linkClass}`}
          >
            Work
            <span
              className={`absolute bottom-0 left-0 w-0 group-hover/work:w-full h-0.5 transition-all ease-out duration-300 ${underlineClass}`}
            ></span>
          </Link>
          <Link
            href="/#services"
            className={`group/services relative button-text transition-colors duration-300 ease-out ${linkClass}`}
          >
            Services
            <span
              className={`absolute bottom-0 left-0 w-0 group-hover/services:w-full h-0.5 transition-all ease-out duration-300 ${underlineClass}`}
            ></span>
          </Link>

          <Link
            href="/contact"
            className={`group/services relative button-text transition-colors duration-300 ease-out ${linkClass}`}
          >
            Contact
            <span
              className={`absolute bottom-0 left-0 w-0 group-hover/services:w-full h-0.5 transition-all ease-out duration-300 ${underlineClass}`}
            ></span>
          </Link>

          <PrimaryButton href="mailto:hello@madushan.design">
            Let's Talk
          </PrimaryButton>
        </div>
      </div>
    </nav>
  );
};

export default Header;
