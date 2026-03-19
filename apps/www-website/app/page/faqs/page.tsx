import Link from "next/link";

export const metadata = {
  title: "Frequently Asked Questions (FAQs)",
  description:
    "Get quick answers to common questions about Anix Lab (formerly Anix7). Learn about features, tools, support, and usage policies.",
  keywords: [
    "Anix Lab FAQ",
    "Anix Lab questions",
    "Anix Lab support",
    "Help center",
    "Anix Lab tools",
    "User guide",
    "Common issues",
    "Account support",
    "Anix Lab help",
    "Frequently asked questions",
    "Anix Lab (formerly Anix7)",
  ],
  alternates: { canonical: "/page/faqs" },
  addToSitemap: true,
};

interface Faq {
  question: string;
  answer: React.ReactNode;
}

const faqs: Faq[] = [
  {
    question: "What is Anix Lab?",
    answer: (
      <>
        Anix Lab (formerly Anix7) is a multi-platform digital ecosystem offering tools, games, anime
        content, app marketplaces, wallpapers, AI utilities, and more — designed to enhance
        productivity and entertainment for users worldwide.
      </>
    ),
  },
  {
    question: "What services does Anix Lab offer?",
    answer: (
      <>
        We provide a growing collection of web-based apps including Anix Lab Tools (URL shortener,
        image tools, QR generator),
        {/* Anix Lab Anime (reviews and updates), */}
        Anix Play (browser-based games), AniPic (HD images and wallpapers) and more.
      </>
    ),
  },
  {
    question: "Is Anix Lab free to use?",
    answer: (
      <>
        Yes. Most of our tools and platforms are free to use. Optional Pro features may be available
        for enhanced functionality and an ad-free experience.
      </>
    ),
  },
  {
    question: "Do I need an account to use Anix Lab?",
    answer: (
      <>
        No account is required for most features. Some advanced tools or personalization options may
        require login in the future.
      </>
    ),
  },
  {
    question: "Can I use Anix Lab on mobile devices?",
    answer: (
      <>
        Absolutely. All platforms are fully responsive and optimized for mobile, tablet, and desktop
        usage.
      </>
    ),
  },
  {
    question: "What is Anix Lab Tools?",
    answer: (
      <>
        Anix Lab Tools is a suite of fast, privacy-focused utilities such as URL shorteners, QR code
        generators, bulk image resizers, and more — all running directly in your browser.
      </>
    ),
  },
  {
    question: "What is AniPic?",
    answer: (
      <>
        AniPic is a curated collection of anime wallpapers in HD and 4K quality, available for free
        viewing and download.
      </>
    ),
  },
  {
    question: "What kind of games are available?",
    answer: (
      <>
        Anix Lab Games features lightweight, browser-based games including puzzles, logic games, and
        casual arcade experiences that require no installation.
      </>
    ),
  },
  // {
  //   question: "What does Anix Lab Anime offer?",
  //   answer: (
  //     <>
  //       It provides anime reviews, news, seasonal updates, episode summaries, and recommendations
  //       for anime enthusiasts.
  //     </>
  //   ),
  // },
  // {
  //   question: "What is the Telegram App Market?",
  //   answer: (
  //     <>
  //       A curated directory of useful Telegram bots, apps, and channels, organized by category and
  //       regularly updated.
  //     </>
  //   ),
  // },
  {
    question: "Are tools and games browser-based?",
    answer: (
      <>
        Yes. Everything is designed to run directly in your browser — no downloads or installations
        required.
      </>
    ),
  },
  {
    question: "Can I suggest features or improvements?",
    answer: (
      <>
        Yes, we welcome feedback. Send your ideas to{" "}
        <strong>
          <a href="mailto:contact@anixlab.in">contact@anixlab.in</a>
        </strong>
        .
      </>
    ),
  },
  {
    question: "How do I report bugs or technical issues?",
    answer: (
      <>
        If you experience any bugs or glitches, report them via email at{" "}
        <strong>
          <a href="mailto:support@anixlab.in">support@anixlab.in</a>
        </strong>
        , and our team will investigate promptly.
      </>
    ),
  },
  {
    question: "Is my data safe?",
    answer: (
      <>
        Yes. We prioritize privacy by using browser-side processing whenever possible and minimizing
        data collection. See our <Link href="/page/privacy-policy">Privacy Policy</Link> for
        details.
      </>
    ),
  },
  {
    question: "Is dark mode available?",
    answer: (
      <>
        Yes. All major platforms support both light and dark themes based on your system
        preferences.
      </>
    ),
  },
  {
    question: "Can I use resources commercially?",
    answer: (
      <>
        Most resources are intended for personal use. For commercial usage, please review licensing
        details or contact us directly.
      </>
    ),
  },
  {
    question: "Do you offer APIs?",
    answer: (
      <>Not currently, but we are exploring developer-focused tools and APIs for the future.</>
    ),
  },
  {
    question: "Will new services be added?",
    answer: (
      <>
        Yes. Anix Lab is continuously evolving with new tools and features based on user feedback
        and emerging trends.
      </>
    ),
  },
  {
    question: "Where is Anix Lab based?",
    answer: (
      <>
        Anix Lab operates from India and serves users globally, aiming to simplify digital
        experiences with fast and accessible tools.
      </>
    ),
  },
  {
    question: "How can I stay updated?",
    answer: (
      <>
        Follow our website and upcoming social channels for updates, new features, and
        announcements.
      </>
    ),
  },
];

export default function Faqs() {
  return (
    <>
      <h1>Frequently Asked Questions (FAQs)</h1>

      <p className="my-1 ml-1">
        Welcome to the FAQ page for <strong>Anix Lab</strong> (formerly Anix7). Below are answers to
        common questions about our services and platforms. If you need further assistance, feel free
        to contact us at{" "}
        <strong>
          <a href="mailto:contact@anixlab.in">contact@anixlab.in</a>
        </strong>
        .
      </p>

      <hr className="my-5" />

      {faqs.map((faq, index) => (
        <div key={index} className="mb-6">
          <h2>
            {index + 1}. <strong>{faq.question}</strong>
          </h2>
          <p className="my-1 ml-1">{faq.answer}</p>
        </div>
      ))}
    </>
  );
}
