import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
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
  metadataBase: new URL("https://madushan.design"),
  title: {
    default: "Madushan — UI/UX Designer & Frontend Developer",
    template: "%s — Madushan",
  },
  description:
    "Freelance UI/UX designer and React/Next.js developer based in Sri Lanka. Available for remote projects worldwide.",
  authors: [{ name: "Madushan" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Madushan",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Madushan — UI/UX Designer & Frontend Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0C0C0C",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

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
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <TransitionProvider>
          <Wrapper>{children}</Wrapper>
        </TransitionProvider>
      </body>
    </html>
  );
}
