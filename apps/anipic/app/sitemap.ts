import type { MetadataRoute } from "next";
import { getGallerySitemapUrls, getAllTagsSitemapUrls } from "@/features/images/generateCursors";
import { cacheLife } from "next/cache";

const BASE_URL = process.env.BASE_URL ?? "https://anipic.anixlab.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache";
  cacheLife("days");

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE_URL}/gallery`, lastModified: now, changeFrequency: "hourly", priority: 0.9 },
  ];

  const [galleryCursorUrls, tagUrls] = await Promise.all([
    getGallerySitemapUrls(),
    getAllTagsSitemapUrls(),
  ]);

  const galleryCursorPages: MetadataRoute.Sitemap = galleryCursorUrls.slice(1).map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const tagPages: MetadataRoute.Sitemap = tagUrls.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: path.split("/").length === 3 ? 0.8 : 0.6,
    //  /tag/foo      → 3 segments → first page (0.8)
    //  /tag/foo/xyz  → 4 segments → cursor page (0.6)
  }));

  return [...staticPages, ...galleryCursorPages, ...tagPages];
}
