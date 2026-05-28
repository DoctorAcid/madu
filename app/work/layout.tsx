import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies and selected projects in UI/UX design, React, Next.js, and mobile app UI.",
  alternates: { canonical: "https://madushan.design/work" },
  openGraph: {
    title: "Work — Madushan",
    description:
      "Case studies and selected projects in UI/UX design, React, Next.js, and mobile app UI.",
    url: "https://madushan.design/work",
  },
  twitter: {
    title: "Work — Madushan",
    description:
      "Case studies and selected projects in UI/UX design, React, Next.js, and mobile app UI.",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
