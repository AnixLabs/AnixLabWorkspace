import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import Navbar from "@shared/components/navigation/Navbar";
import NoScriptWarning from "@shared/components/errors/NoScriptWarning";
import ScrollToTopButton from "@shared/components/ScrollToTopButton";
import Wave from "@shared/components/Wave";
import SlideBar from "@/components/navigation/SlideBar";
import Providers from "@shared/providers";
import DefaultHead from "@shared/head";
import { Suspense } from "react";
import type { Metadata } from "next";

// Load Inter
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Best for avoiding layout shift
});
const baseUrl = process.env.BASE_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "AniPic - AI Generated Images & Creative Visuals | Anix Lab",
    template: "%s - AniPic",
  },
  description:
    "Discover high-quality AI-generated images and wallpapers on AniPic by Anix Lab (formerly Anix7). Explore anime, art, fantasy, portraits, and creative visuals — free to download.",
  keywords: [
    "AniPic",
    "AniPic - Anix Lab",
    "anixlab.in",
    "AniPic by Anix Lab",
    "AniPic formerly Anix7",
    "AI generated images",
    "AI image platform",
    "AI art gallery",
    "AI wallpapers",
    "AI creative visuals",
    "anime AI images",
    "AI generated photos",
    "free AI images",
    "high quality AI art",
    "AI fantasy art",
    "AI character images",
    "AI image downloads",
    "HD wallpaper",
    "anime boys",
    "aesthetic",
    "sad anime boys",
    "lonely",
    "anime girl",
    "anime landscape",
    "depressed",
    "cute anime boy",
    "clouds",
    "sunset",
    "anime girls",
    "scenic",
    "anime enthusiast hub",
    "anime",
  ],
  authors: {
    name: "Anix Lab",
    url: "https://anixlab.in",
  },
  openGraph: {
    url: "/",
    siteName: "AniPic - Anix Lab",
    images: [
      {
        url: "/assets/img/logo/logo-512.jpg",
        // width: 1200,
        // height: 630,
        width: 512,
        height: 512,
        alt: "AniPic Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/assets/img/logo/logo-512.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <DefaultHead />
      </head>
      <body>
        <Providers>
          <div className="absolute w-48 h-56 bg-neutral-500/5 dark:bg-black/15 -z-10 top-0 right-0 rounded-bl-full" />

          <Navbar appName="AniPic" appSubName="Anix Lab" />
          <div className="flex">
            <SlideBar />
            <div className="grow pt-5 md:pt-7 relative transition-all duration-300 md:w-[calc(100%-224px)] border-l border-white/30">
              <div className="px-5 md:px-6 mx-auto max-w-(--breakpoint-xl)">
                <main>
                  <NoScriptWarning />
                  {children}
                </main>
                <ScrollToTopButton />
                <Suspense>
                  <Footer />
                </Suspense>
              </div>
            </div>
            <Wave />
          </div>
        </Providers>
      </body>
    </html>
  );
}
