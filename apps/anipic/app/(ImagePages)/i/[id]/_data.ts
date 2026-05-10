import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import getAniPicModel from "@/lib/db/models/AniPic";
import { buildSeoDescription, buildSeoTitle } from "@/utils/seo/buildSeoUsingTags";
import { BASE_FILTER } from "@/features/images/const";

export interface ImageData {
  id: string;
  originalUrl: string;
  displayUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  tags: string[];
  title: string;
  description: string;
  downloads: number;
  likes: number;
  createdAt: string; // ISO string for client rendering
}

export async function getImage(id: string): Promise<ImageData | null> {
  "use cache";
  cacheLife("days");
  cacheTag(`image:${id}`);

  const AniPic = await getAniPicModel();
  const img = await AniPic.findOne({ _id: id, ...BASE_FILTER }).lean();

  if (!img) return null;

  return {
    id: img._id.toString(),
    originalUrl: img.originalUrl,
    displayUrl: img.displayUrl,
    thumbnailUrl: img.thumbnailUrl,
    width: img.width ?? 1920,
    height: img.height ?? 1080,
    tags: img.tags,
    title: buildSeoTitle(img.tags),
    description: buildSeoDescription(img.tags),
    downloads: img.downloads ?? 0,
    likes: img.likes ?? 0,
    createdAt: img.createdAt.toISOString(),
  };
}
