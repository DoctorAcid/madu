"use client";

interface ArrowRightSvgProps {
  className?: string;
}

const ArrowRightSvg = ({ className = "" }: ArrowRightSvgProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-all ease-out duration-300`}
    >
      <path
        d="M3 13H21M17 17L21 13L17 9"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ArrowRightSvg;
