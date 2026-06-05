import React from "react";
import type { Metadata } from "next";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import SecondaryButton from "@/components/common/buttons/SecondaryButton";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Madushan",
  description: "The page you are looking for does not exist.",
};

const NotFound = () => {
  return (
    <section className="w-full flex flex-col">
      <div className="w-full flex md:flex-row flex-col justify-between gap-8 mt-12 p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-20">
        <div className="flex flex-col">
          <h2 className="text-primary-1">404</h2>
          <h4 className="text-black-1">Page Not Found</h4>
        </div>

        <div className="flex flex-col items-end gap-4">
          <p className="text-dark-gray-1 max-w-[400px] text-right">
            Looks like this page doesn’t exist (yet). Just like a blank space in
            a conversation, there’s nothing to respond to.
          </p>
          <SecondaryButton href="/" arrow="left">
            Back to Home
          </SecondaryButton>
        </div>
      </div>

      <div className="w-full h-full p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-20 flex items-center justify-center relative">
        <div className="absolute border-dark-gray-1 top-12 left-12 border-l-2 border-t-2 w-8 h-8" />
        <div className="absolute border-dark-gray-1 bottom-12 right-12 border-r-2 border-b-2 w-8 h-8" />
        <div className="absolute border-dark-gray-1 top-12 right-12 w-8 h-8 border-r-2 border-t-2" />
        <div className="absolute border-dark-gray-1 bottom-12 left-12 w-8 h-8 border-l-2 border-b-2" />
        <div className="absolute w-8 h-8 flex items-center justify-center">
          <span className="w-full border border-dark-gray-1" />
          <span className="absolute h-full border border-dark-gray-1" />
        </div>

        <div className="w-full h-full flex overflow-hidden">
          <svg
            width="1745"
            height="623"
            viewBox="0 0 1745 623"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_54030_2)">
              <mask
                id="mask0_54030_2"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="1745"
                height="623"
              >
                <path
                  d="M342.852 610.456V483.139H0V346.831L317.139 12.5436H472.676V373.173H551.909V483.139H472.676V610.456H342.852ZM342.852 373.173V137.771L120.207 373.173H342.852Z"
                  fill="#6C6C6C"
                />
                <path
                  d="M596.399 311.5C596.399 280.141 599.465 250.733 605.597 223.277C611.729 195.681 620.51 170.384 631.938 147.388C643.367 124.252 657.234 103.555 673.54 85.2966C689.986 67.0387 708.383 51.6379 728.731 39.0943C749.219 26.4113 771.518 16.7248 795.629 10.0349C819.74 3.34496 845.315 0 872.353 0C899.391 0 924.966 3.34496 949.077 10.0349C973.188 16.7248 995.418 26.4113 1015.77 39.0943C1036.25 51.6379 1054.65 67.0387 1070.96 85.2966C1087.4 103.555 1101.34 124.252 1112.77 147.388C1124.2 170.384 1132.98 195.681 1139.11 223.277C1145.24 250.872 1148.31 280.28 1148.31 311.5C1148.31 342.72 1145.24 372.128 1139.11 399.724C1132.98 427.319 1124.2 452.685 1112.77 475.822C1101.34 498.818 1087.4 519.445 1070.96 537.703C1054.65 555.961 1036.25 571.432 1015.77 584.115C995.418 596.658 973.188 606.275 949.077 612.965C924.966 619.655 899.391 623 872.353 623C845.315 623 819.74 619.655 795.629 612.965C771.518 606.275 749.219 596.658 728.731 584.115C708.383 571.432 689.986 555.961 673.54 537.703C657.234 519.445 643.367 498.818 631.938 475.822C620.51 452.685 611.729 427.319 605.597 399.724C599.465 372.128 596.399 342.72 596.399 311.5ZM729.358 311.5C729.358 343.417 732.494 371.709 738.766 396.379C745.177 421.048 754.445 441.814 766.571 458.679C778.835 475.403 793.817 488.086 811.518 496.728C829.357 505.369 849.636 509.689 872.353 509.689C895.07 509.689 915.279 505.369 932.979 496.728C950.819 488.086 965.801 475.403 977.926 458.679C990.191 441.814 999.459 421.048 1005.73 396.379C1012.14 371.709 1015.35 343.417 1015.35 311.5C1015.35 279.583 1012.14 251.291 1005.73 226.621C999.459 201.952 990.191 181.255 977.926 164.531C965.801 147.666 950.819 134.914 932.979 126.272C915.279 117.631 895.07 113.311 872.353 113.311C849.636 113.311 829.357 117.631 811.518 126.272C793.817 134.914 778.835 147.666 766.571 164.531C754.445 181.255 745.177 201.952 738.766 226.621C732.494 251.291 729.358 279.583 729.358 311.5Z"
                  fill="#6C6C6C"
                />
                <path
                  d="M1535.94 610.456V483.139H1193.09V346.831L1510.23 12.5436H1665.77V373.173H1745V483.139H1665.77V610.456H1535.94ZM1535.94 373.173V137.771L1313.3 373.173H1535.94Z"
                  fill="#6C6C6C"
                />
              </mask>
              <g mask="url(#mask0_54030_2)">
                <path
                  d="M1812 672H-68V646H1812V672ZM1812 630H-68V596H1812V630ZM1812 580H-68V535H1812V580ZM1812 519H-68V458H1812V519ZM1812 442H-68V358H1812V442ZM1812 342H-68V185H1812V342ZM1812 169H-68V-48H1812V169Z"
                  fill="url(#paint0_linear_54030_2)"
                />
              </g>
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_54030_2"
                x1="872"
                y1="-48"
                x2="872"
                y2="672"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#F9704C" />
                <stop offset="1" stopColor="#FFEEE9" />
              </linearGradient>
              <clipPath id="clip0_54030_2">
                <rect width="1745" height="623" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
