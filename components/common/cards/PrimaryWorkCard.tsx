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
  const plusRef = useRef<SVGPathElement>(null);
  const morphRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    gsap.set(morphRef.current, {
      opacity: 0,
      rotate: -90,
      transformOrigin: "center",
    });
    gsap.set(plusRef.current, {
      opacity: 1,
      rotate: 0,
      transformOrigin: "center",
    });
  }, []);

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(plusRef.current, {
      opacity: 0,
      rotate: 90,
      duration: 0.3,
      ease: "power2.in",
      transformOrigin: "center",
    });
    gsap.to(morphRef.current, {
      opacity: 1,
      rotate: 0,
      duration: 0.35,
      ease: "power2.out",
      transformOrigin: "center",
      delay: 0.1,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, -50% 0%, 0% 100%, 0% 100%)",
      duration: 0.6,
      ease: "power2.out",
    });
    gsap.to(morphRef.current, {
      opacity: 0,
      rotate: -90,
      duration: 0.3,
      ease: "power2.in",
      transformOrigin: "center",
    });
    gsap.to(plusRef.current, {
      opacity: 1,
      rotate: 0,
      duration: 0.35,
      ease: "power2.out",
      transformOrigin: "center",
      delay: 0.1,
    });
  };
  return (
    <Link href={item.href}>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group/work relative flex flex-col gap-6 cursor-pointer"
      >
        {/* <div className="absolute top-0 left-0 eyebrow text-dark-gray-1">
          0{item.id}
        </div> */}
        <div className="z-10 shrink absolute right-0 top-0 flex align-center p-8 mix-blend-difference">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-white transition-all duration-300 "
          >
            <path
              ref={plusRef}
              id="plus-shape"
              d="M21 2C21.5523 2 22 2.44772 22 3V14C22 16.2091 23.7909 18 26 18H37C37.5523 18 38 18.4477 38 19V21C38 21.5523 37.5523 22 37 22H26C23.7909 22 22 23.7909 22 26V37C22 37.5523 21.5523 38 21 38H19C18.4477 38 18 37.5523 18 37V26C18 23.7909 16.2091 22 14 22H3C2.44772 22 2 21.5523 2 21V19C2 18.4477 2.44772 18 3 18H14C16.2091 18 18 16.2091 18 14V3C18 2.44772 18.4477 2 19 2H21Z"
            />
            <path
              ref={morphRef}
              style={{ opacity: 0 }}
              id="morph-path"
              d="M24.707 7.29289C25.0976 6.90237 25.7306 6.90238 26.1211 7.29289L38.1855 19.3573C38.1993 19.3711 38.2118 19.3859 38.2246 19.4003L38.2754 19.4511C38.6659 19.8416 38.6658 20.4746 38.2754 20.8652L26.1221 33.0194C25.7315 33.41 25.0976 33.41 24.707 33.0194L23.293 31.6054C22.9026 31.2149 22.9027 30.5818 23.293 30.1913L31.4844 21.9999H2C1.44779 21.9999 1.00012 21.5521 1 20.9999V18.9999C1 18.4476 1.44772 17.9999 2 17.9999H31.1719L23.293 10.121C22.9025 9.73049 22.9024 9.09747 23.293 8.70695L24.707 7.29289Z"
            />
          </svg>
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
          <div className="shape-container w-full aspect-square relative rounded-2xl overflow-hidden">
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
        <div className="absolute bottom-0 left-0 flex justify-between gap-8 p-8 max-w-2/3">
          <div className="flex flex-col gap-4">
            <h6 className="text-white group-hover/work:text-primary-1 transition-color duration-300 mix-blend-difference">
              {item.title}
            </h6>
            {/* <p className="text-dark-gray-1">{item.description}</p> */}
          </div>

          {/* <PrimaryArrowButton className="group-hover/work:stroke-primary-1 group-hover/work:-rotate-45" /> */}
        </div>
        {/* <div className="flex flex-wrap gap-1">
          {item.keywords.map((keyword, index) => (
            <PrimaryBadge key={index} text={keyword} />
          ))}
        </div> */}
      </div>
    </Link>
  );
};

export default PrimaryWorkCard;
