import "./globals.css";
import Providers from "@shared/providers";
import { BgGlow, BgGridPattern } from "@/components/bg";

const baseUrl = process.env.BASE_URL!;

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Anix Lab AdminOS - Manage Tools, Content & Platform",
    template: "%s - Anix Lab AdminOS",
  },
  description:
    "Anix Lab AdminOS (formerly Anix7 Admin) is a powerful dashboard to manage tools, anime content, games, media, and platform operations efficiently in one place.",
  keywords: [
    "Anix Lab AdminOS",
    "Anix Lab admin panel",
    "Anix Lab dashboard",
    "AdminOS platform",
    "content management system",
    "tools management dashboard",
    "anime content admin",
    "media management system",
    "Anix Lab (formerly Anix7)",
  ],
  authors: [{ name: "Anix Lab" }],
  openGraph: {
    url: "/",
    siteName: "Anix Lab AdminOS",
    // images: [
    //   {
    //     url: `/assets/img/logo/anixlab-logo-512.jpg`,
    //     // width: 1200,
    //     // height: 630,
    //     width: 512,
    //     height: 512,
    //     alt: "Anix Lab AdminOS Logo",
    //   },
    // ],
    type: "website",
  },
  // twitter: {
  //   card: "summary_large_image",
  //   images: ["/assets/img/logo/anixlab-logo-512.jpg"],
  // },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="font-['Syne',sans-serif] text-white bg-linear-to-b from-[#030005] to-[#000006] relative min-h-screen">
        <Providers>
          <BgGridPattern />
          <BgGlow />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
