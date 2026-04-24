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
    default: "Anix Lab - Explore Tools, Games, Images and Stunning Visuals",
    template: "%s - Anix Lab",
  },

  description:
    "Anix Lab (formerly Anix7) is your all-in-one digital hub for smart tools, 4K wallpapers, mini games and many more. Discover, create and download with ease.",

  keywords: [
    "Anix Lab",
    "Anix7",
    "Anix Lab tools",
    "anime platform",
    "free tools website",
    "online utilities",
    "4K wallpapers",
    "stunning visuals",
    "ai-generated images",
    "profile picture",
    "mini games",
    "digital hub",
  ],

  authors: [{ name: "Anix Lab" }],
  creator: "Anix Lab",
  publisher: "Anix Lab",

  openGraph: {
    url: "/",
    siteName: "Anix Lab",
    images: [
      {
        url: `/assets/og-image.jpeg`,
        width: 1200,
        height: 630,
        alt: "Anix Lab - Explore Tools, Games, and Stunning Visuals",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
  },

  appleWebApp: {
    title: "Anix Lab",
    capable: true,
    statusBarStyle: "default",
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

          <Navbar appName="Anix Lab" />
          <div className="flex">
            <SlideBar />
            <div className="grow pt-5 md:pt-7 relative transition-all duration-300 md:w-[calc(100%-224px)] border-l border-white/30">
              <div className="px-5 md:px-6 mx-auto max-w-(--breakpoint-xl)">
                <main>
                  <NoScriptWarning />
                  {children}
                </main>
                <ScrollToTopButton />
                <Footer />
              </div>
            </div>
            <Wave />
          </div>
        </Providers>
      </body>
    </html>
  );
}
