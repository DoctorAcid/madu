"use client";

import React, { useEffect, useRef } from "react";
import PrimaryBadge from "../badges/PrimaryBadge";
import PrimaryArrowButton from "../buttons/PrimaryArrowButton";
import Image from "next/image";
import gsap from "gsap";
import Link from "next/link";

interface PrimaryWorkCardProps {
  item: {
    id: number;
    title: string;
    description: string;
    keywords: string[];
    image: string;
    hoverImage: string;
    href: string;
  };
}

const PrimaryWorkCard = ({ item }: PrimaryWorkCardProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, -50% 0%, 0% 100%, 0% 100%)",
      duration: 0.6,
      ease: "power2.out",
    });
  };
  return (
    <Link href={item.href}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group/work relative flex flex-col gap-6 cursor-pointer"
      >
        <div className="eyebrow text-dark-gray-1">
          <span className="text-primary-1">// </span>0{item.id}
        </div>
        <div className="w-full aspect-video relative rounded-2xl overflow-hidden">
          <div
            ref={imgRef}
            style={{
              clipPath: "polygon(0% 0%, -50% 0%, 0% 100%, 0% 100%)",
            }}
            className="z-10 w-full h-full absolute overflow-hidden"
          >
            <Image
              src={item.hoverImage}
              alt={item.title}
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1024px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
        <div className="flex justify-between gap-8">
          <div className="flex flex-col gap-4">
            <h5 className="text-black-2 group-hover/work:text-primary-1 transition-color duration-300">
              {item.title}
            </h5>
            <p className="text-dark-gray-1">{item.description}</p>
          </div>

          <PrimaryArrowButton className="group-hover/work:stroke-primary-1 group-hover/work:-rotate-45" />
        </div>
        <div className="flex flex-wrap gap-1">
          {item.keywords.map((keyword, index) => (
            <PrimaryBadge key={index} text={keyword} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default PrimaryWorkCard;
