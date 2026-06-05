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
        <div className="relative">
          <div className="z-10 absolute right-0 bottom-[70px]">
            <svg
              width="29"
              height="69"
              viewBox="0 0 29 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-primary-5 transition-all ease-out duration-300"
            >
              <path
                d="M29 40.2949L0.294922 69H0.175781C17.8359 51.551 28.8307 27.3729 29 0.625V40.2949Z"
                fill=""
              />
            </svg>
          </div>

          <div className="z-10 absolute -bottom-[1px] right-[70px]">
            <svg
              width="69"
              height="29"
              viewBox="0 0 69 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-primary-5 transition-all ease-out duration-300"
            >
              <path
                d="M40.6794 28.4337H0.0842451L0 28.3494C24.8259 28.4987 49.6969 19.1767 68.7302 0.382812L40.6794 28.4337Z"
                fill=""
              />
            </svg>
          </div>

          <div className="z-10 absolute -top-[1px] left-[70px]">
            <svg
              width="69"
              height="30"
              viewBox="0 0 69 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-primary-5 transition-all ease-out duration-300"
            >
              <path
                d="M28.9131 0.984375L0.208008 29.6895L0.208008 29.8086C17.657 12.1485 41.8351 1.15368 68.583 0.984375L28.9131 0.984375Z"
                fill=""
              />
            </svg>
          </div>

          <div className="z-10 absolute top-[70px] -left-[1px]">
            <svg
              width="29"
              height="69"
              viewBox="0 0 29 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-primary-5 transition-all ease-out duration-300"
            >
              <path
                d="M0.339844 28.0938L0.339846 68.6889L0.424091 68.7732C0.2748 43.9473 9.59679 19.0763 28.3907 0.0429688L0.339844 28.0938Z"
                fill=""
              />
            </svg>
          </div>
          <div className="shape-container w-full aspect-video relative rounded-2xl overflow-hidden">
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
