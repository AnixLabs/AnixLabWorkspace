import Hr from "@shared/components/ui/Hr";
import Link from "next/link";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Anix Lab (formerly Anix7) — a modern multi-platform digital ecosystem offering tools, apps, wallpapers, games, and more.",
  keywords: [
    "Anix Lab",
    "Anix Lab About",
    "Anix Lab tools",
    "Anix Lab games",
    "Anix Lab apps",
    "Anix Lab wallpapers",
    "free tools platform",
    "digital ecosystem",
    "Anix Lab (formerly Anix7)",
  ],
  alternates: { canonical: "/page/about-us" },
  addToSitemap: true,
};

export default function AboutUs() {
  return (
    <>
      <h1>
        <strong>About Anix Lab</strong>
      </h1>
      <p className="my-1 ml-1">
        <strong>Anix Lab</strong> (formerly Anix7) is a growing digital ecosystem designed to make
        your online experience faster, smarter, and more productive. From everyday tools to creative
        apps, from gaming to anime, and from AI-powered utilities to open-source software, Anix Lab
        brings everything together under one seamless platform.
      </p>
      <Hr />

      <h2>
        🌐 <strong>Our Vision</strong>
      </h2>
      <p className="my-1 ml-1">
        To create a unified platform that empowers users with useful, fun, and intelligent digital
        solutions — all in one place, accessible to everyone for free or at affordable pricing.
      </p>
      <Hr />

      <h2>
        🛠️ <strong>What We Offer</strong>
      </h2>

      <h4>
        🔧 <strong>Anix Lab Tools</strong>
      </h4>
      <p className="my-1 ml-1">
        A suite of powerful and privacy-focused online utilities — including:
      </p>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>Bulk Image Resizer</li>
        <li>QR Code Generator</li>
        <li>URL Shortener</li>
        <li>Image Converters &amp; Editors</li>
        <li>
          PDF Tools (coming soon). All browser-based, fast, and available as ad-supported or Pro
          subscription-based features.
        </li>
      </ul>

      <h4>
        🕹️ <strong>Anix Play (Coming soon)</strong>
      </h4>
      <p className="my-1 ml-1">
        Fun, lightweight, browser-based games for instant entertainment — no installation required.
      </p>

      {/* <h4>
        🤖 <strong>Anix Lab AI</strong>
      </h4>
      <p className="my-1 ml-1">
        Smart AI tools for creators and developers — including content generators,
        AI image tools, and more.
      </p> */}

      <h4>
        🖼️ <strong>AniPic by Anix Lab</strong>
      </h4>
      <p className="my-1 ml-1">
        A curated gallery of <strong>high-resolution anime images and wallpapers</strong>, including
        4K, for free download and inspiration.
      </p>

      {/* <h4>
        📱 <strong>Anix Lab Telegram App Market (Coming soon)</strong>
      </h4>
      <p className="my-1 ml-1">
        A collection of <strong>curated Telegram apps and bots</strong>, ready to explore and use.
      </p> */}

      {/* <h4>
        🌸 <strong>Anix Lab Anime</strong>
      </h4>
      <p className="my-1 ml-1">
        Your source for anime reviews, news, seasonal updates, character information, and more.
      </p> */}

      <Hr />

      <h2>
        🔒 <strong>Our Core Values</strong>
      </h2>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>
          <strong>Privacy-First</strong>: Most tools work directly in your browser — no server-side
          processing unless necessary.
        </li>
        <li>
          <strong>Accessibility</strong>: Free to use with optional Pro features — minimal barriers
          to entry.
        </li>
        <li>
          <strong>Open Innovation</strong>: Always evolving. Always experimenting.
        </li>
        <li>
          <strong>Community Driven</strong>: Built for creators, developers, anime fans, gamers,
          and tech enthusiasts.
        </li>
      </ul>

      <Hr />

      <h2>
        🚀 <strong>Why Choose Anix Lab?</strong>
      </h2>
      <ul className="list-disc ml-5 pl-5 space-y-2">
        <li>No login required for most tools</li>
        <li>Mobile-friendly design</li>
        <li>Continuously improving based on user feedback</li>
        <li>Fast, lightweight, and optimized performance</li>
        <li>Everything in one unified platform</li>
      </ul>

      <Hr />

      <h2>
        💬 <strong>Stay Connected</strong>
      </h2>
      <p className="my-1 ml-1">
        Got suggestions, bug reports, or collaboration ideas? We&apos;d love to hear from you.
      </p>
      <p className="my-1 ml-1">
        📩 <strong>Email</strong>: <a href="mailto:contact@anixlab.in">contact@anixlab.in</a>
      </p>
      <p className="my-1 ml-1">
        🌐 <strong>Website</strong>: <Link href="/">www.anixlab.in</Link>
      </p>
      <p className="my-1 ml-1">
        🔗 <strong>Telegram</strong>: Coming soon
      </p>
      <p className="my-1 ml-1">
        🐦 <strong>Twitter / X</strong>: Coming soon
      </p>
    </>
  );
}
