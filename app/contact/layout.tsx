import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Let's Talk",
  description:
    "Have a project in mind? I'm available for UI/UX design and frontend development. Let's build something together.",
  alternates: { canonical: "https://madushan.design/contact" },
  openGraph: {
    title: "Let's Talk — Madushan",
    description:
      "Have a project in mind? I'm available for UI/UX design and frontend development. Let's build something together.",
    url: "https://madushan.design/contact",
  },
  twitter: {
    title: "Let's Talk — Madushan",
    description:
      "Have a project in mind? I'm available for UI/UX design and frontend development. Let's build something together.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
