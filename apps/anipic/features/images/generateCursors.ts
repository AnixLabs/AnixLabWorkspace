import { cacheLife, cacheTag } from "next/cache";
import getAniPicModel from "@/lib/db/models/AniPic";
import { BASE_FILTER, IMAGE_LIMIT_PER_LOAD } from "./const";
import { encodeCursor } from "./utils";
import { getAllTags } from "./loadImages";

async function fetchBoundaryIds(filter: Record<string, unknown>): Promise<string[]> {
  const AniPic = await getAniPicModel();

  const rows = await AniPic.aggregate<{ _id: { toString(): string } }>([
    { $match: filter },
    // assign a 1-based row number to each document in _id-desc order
    {
      $setWindowFields: {
        sortBy: { _id: -1 },
        output: { _rowNum: { $documentNumber: {} } },
      },
    },
    // keep only the rows that sit exactly at a page boundary
    { $match: { $expr: { $eq: [{ $mod: ["$_rowNum", IMAGE_LIMIT_PER_LOAD] }, 0] } } },
    // return only the _id
    { $project: { _id: 1 } },
  ]);

  return rows.map((r) => r._id.toString());
}

export async function generateGalleryCursors(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  cacheTag("anipicCursors");
  cacheTag("anipicImagePages");

  const ids = await fetchBoundaryIds(BASE_FILTER);
  return ids.map((id) => encodeCursor({ id }));
}

export async function getGallerySitemapUrls(): Promise<string[]> {
  const cursors = await generateGalleryCursors();
  return ["/gallery", ...cursors.map((c) => `/gallery/${c}`)];
}

export async function generateTagCursors(tag: string): Promise<string[]> {
  "use cache";
  cacheLife("days");
  cacheTag("anipicCursors");
  cacheTag(`anipicTag:${tag}`);

  const ids = await fetchBoundaryIds({ ...BASE_FILTER, tags: tag });
  return ids.map((id) => encodeCursor({ id }));
}

async function getTagSitemapUrls(tag: string): Promise<string[]> {
  const cursors = await generateTagCursors(tag);
  const encoded = encodeURIComponent(tag);
  return [`/tag/${encoded}`, ...cursors.map((c) => `/tag/${encoded}/${c}`)];
}

export async function getAllTagsSitemapUrls(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  cacheTag("anipicCursors");
  cacheTag("anipicImagePages");

  const tags = await getAllTags();
  const urlArrays = await Promise.all(tags.map((tag) => getTagSitemapUrls(tag)));

  return urlArrays.flat();
}
