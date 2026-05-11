import type { Metadata } from "next";
import Link from "next/link";
import {
  IoSparklesOutline,
  IoSearchOutline,
  IoImagesOutline,
  IoCloudDownloadOutline,
  IoFlashOutline,
} from "react-icons/io5";
import { capitalize } from "@/utils/capitalize";
import { loadLandingData } from "@/features/images/loadLandingPageData";
import { Button } from "@shared/components/ui/Button";
import { Input } from "@shared/components/ui/Input";
import { LandingPageMasonryGrid } from "@/components/MasonryImageGrid";

export const metadata: Metadata = {
  title: "AniPic — AI Wallpapers & Art",
  description:
    "Discover thousands of stunning AI-generated images, wallpapers, and digital art on AniPic. Free to browse and download.",
  alternates: { canonical: "/" },
};

function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-3.625rem)] lg:min-h-[calc(100vh-3.8125rem)] xl:min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center pb-24">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-sm">
        <IoSparklesOutline className="text-sm" />
        AI-Powered Images
      </div>

      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-tight">
        Discover{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-400 via-pink-400 to-violet-400">
          Images
        </span>
        <br />
        Like Never Before
      </h1>

      <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-lg mb-10 leading-relaxed">
        Browse thousands of high-quality AI-generated wallpapers, illustrations, and digital art —
        all free to download.
      </p>

      <form
        action="/gallery"
        method="GET"
        className="w-full max-w-2xl flex gap-2 sm:gap-3 mb-10 px-px"
      >
        <div className="flex-1 relative">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-lg pointer-events-none" />
          <Input
            type="text"
            name="q"
            placeholder="Search characters, styles, moods..."
            className="w-full pl-11"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      <div className="flex flex-wrap items-center gap-3 justify-center text-sm font-bold">
        <Link
          href="/gallery"
          className="px-7 py-3.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-900 dark:hover:bg-neutral-50 hover:shadow-none active:scale-95 transition-all"
        >
          Explore Gallery →
        </Link>
        <Link
          href="/gallery?sort=popular"
          className="px-7 py-3.5 rounded-2xl border border-theme-700 bg-theme-500/20 text-inherit hover:border-theme-500 hover:bg-theme-600/20 active:scale-95 transition-all backdrop-blur-sm"
        >
          Trending Now ↗
        </Link>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-linear-to-b from-neutral-600 dark:from-neutral-400 to-transparent" />
      </div>
    </section>
  );
}

function FeaturesSection() {
  const features = [
    {
      icon: IoSparklesOutline,
      title: "AI Generated",
      desc: "Every image crafted by cutting-edge AI for stunning aesthetics.",
      gradient: "from-rose-500/20 to-pink-500/20",
      border: "border-rose-500/20",
      iconColor: "text-rose-400",
    },
    {
      icon: IoImagesOutline,
      title: "High Resolution",
      desc: "Up to 4K wallpapers and illustrations perfect for any screen or device.",
      gradient: "from-violet-500/20 to-purple-500/20",
      border: "border-violet-500/20",
      iconColor: "text-violet-400",
    },
    {
      icon: IoCloudDownloadOutline,
      title: "Free Downloads",
      desc: "Download any image instantly. No account required.",
      gradient: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/20",
      iconColor: "text-blue-400",
    },
    {
      icon: IoFlashOutline,
      title: "Smart Search",
      desc: "Find exactly what you want with tag-based search, filters, and sorting.",
      gradient: "from-amber-500/20 to-orange-500/20",
      border: "border-amber-500/20",
      iconColor: "text-amber-400",
    },
  ];

  return (
    <section className="py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="p-6 rounded-3xl border border-theme-600 dark:border-neutral-800 bg-theme-300/20 dark:bg-neutral-900/60 hover:border-neutral-700 transition-colors group"
          >
            <div
              className={`w-11 h-11 rounded-2xl bg-linear-to-br ${f.gradient} border ${f.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
            >
              <f.icon className={`${f.iconColor} text-xl`} />
            </div>
            <h3 className="font-bold text-base mb-2">{f.title}</h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle?: string;
  href: string;
}) {
  return (
    <div className="flex items-end justify-between mb-6 gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight leading-tight">{title}</h2>
        {subtitle && (
          <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">{subtitle}</p>
        )}
      </div>
      <Link
        href={href}
        className="text-sm text-rose-400 hover:text-rose-300 transition-colors font-semibold whitespace-nowrap shrink-0"
      >
        View all →
      </Link>
    </div>
  );
}

function TagCloudSection({ tags }: { tags: { tag: string; count: number }[] }) {
  return (
    <section className="py-16">
      <SectionHeader title="Popular Tags" subtitle="Explore art by theme or style" href="/tags" />
      <div className="flex flex-wrap">
        {tags.map(({ tag, count }) => (
          <Button
            key={tag}
            href={`/tag/${encodeURIComponent(tag)}`}
            className="flex items-center gap-2 py-1 rounded-full border border-theme-600 bg-theme-500/10 text-neutral-600 dark:text-neutral-400"
          >
            <span>{capitalize(tag)}</span>
            <span className="text-xs ">{count.toLocaleString()}</span>
          </Button>
        ))}
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="h-px bg-linear-to-r from-transparent via-neutral-800 to-transparent" />
    </div>
  );
}

export default async function HomePage() {
  const { popularTags, popularPhotos, mostDownloaded, recentPhotos } = await loadLandingData();

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <TagCloudSection tags={popularTags} />

      {/* Trending Now */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <SectionHeader
          title="Trending Now"
          subtitle="Most loved by the community"
          href="/gallery?sort=popular"
        />
        <LandingPageMasonryGrid images={popularPhotos} />
      </section>

      <Divider />

      {/* Most Downloaded */}
      <section className="py-16">
        <SectionHeader
          title="Most Downloaded"
          subtitle="Fan favorites everyone keeps"
          href="/gallery?sort=downloads"
        />
        <LandingPageMasonryGrid images={mostDownloaded} />
      </section>

      <Divider />

      {/* Recent Uploads */}
      <section className="pt-16 pb-24">
        <SectionHeader title="Latest Uploads" subtitle="Fresh art just added" href="/gallery" />
        <LandingPageMasonryGrid images={recentPhotos} />
      </section>
    </>
  );
}
