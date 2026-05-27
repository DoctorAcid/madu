import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Wrapper from "@/layout/Wrapper";
import TransitionProvider from "@/providers/TransitionProvider";

const Nohemi = localFont({
  src: "../public/assets/fonts/Nohemi-SemiBold.ttf",
  variable: "--font-nohemi",
  display: "swap",
});

const GogaSemiBold = localFont({
  src: "../public/assets/fonts/GogaTest-Semibold.otf",
  variable: "--font-gogaSemiBold",
  display: "swap",
});

const GogaBold = localFont({
  src: "../public/assets/fonts/GogaTest-Bold.otf",
  variable: "--font-gogaBold",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madu | Design Director - Web & Brand Design Specialist",
  description:
    "I'm Madushan — a UI/UX designer and frontend developer crafting clean, conversion-focused digital products for startups and brands worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${Nohemi.variable} ${GogaSemiBold.variable} ${GogaBold.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <TransitionProvider>
          <Wrapper>{children}</Wrapper>
        </TransitionProvider>
      </body>
    </html>
  );
}
