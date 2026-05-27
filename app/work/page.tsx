"use client";

import CTASection from "@/components/home/CTASection";
import CaseStudySection from "@/components/work/CaseStudySection";
import WorkHeroSection from "@/components/work/WorkHeroSection";
import React from "react";

const page = () => {
  return (
    <>
      <WorkHeroSection />
      <CaseStudySection />
      <CTASection />
    </>
  );
};

export default page;
