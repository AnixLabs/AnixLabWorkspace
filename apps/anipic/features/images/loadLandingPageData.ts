import { cacheLife, cacheTag } from "next/cache";
import getAniPicModel from "@/lib/db/models/AniPic";
import { buildSeoTitle } from "@/utils/seo/buildSeoUsingTags";
import type { ImageItem } from "./types";
import type { Types } from "mongoose";
import { BASE_FILTER, LANDING_PAGE_IMAGE_LIMIT, LANDING_PAGE_TAG_LIMIT } from "./const";

const IMAGE_SELECT = { _id: 1, thumbnailUrl: 1, width: 1, height: 1, tags: 1 };

interface ToImageItemInput {
  _id: Types.ObjectId;
  thumbnailUrl: string;
  width?: number;
  height?: number;
  tags: string[];
}

function toImageItem(img: ToImageItemInput) {
  return {
    id: img._id.toString(),
    thumbnailUrl: img.thumbnailUrl,
    width: img.width ?? 512,
    height: img.height ?? 512,
    title: buildSeoTitle(img.tags),
  } satisfies ImageItem;
}

export async function loadLandingData() {
  "use cache";
  cacheLife("hours");
  cacheTag("anipicLanding");
  cacheTag("anipicImagePages");

  const AniPic = await getAniPicModel();

  const [tagAgg, popularRaw, downloadedRaw, recentRaw] = await Promise.all([
    // Top tags by document count
    AniPic.aggregate<{ _id: string; count: number }>([
      { $match: BASE_FILTER },
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: LANDING_PAGE_TAG_LIMIT },
    ]),

    // Top by likes
    AniPic.find(BASE_FILTER)
      .sort({ likes: -1, _id: -1 })
      .limit(LANDING_PAGE_IMAGE_LIMIT)
      .select(IMAGE_SELECT)
      .lean(),

    // Top by downloads
    AniPic.find(BASE_FILTER)
      .sort({ downloads: -1, _id: -1 })
      .limit(LANDING_PAGE_IMAGE_LIMIT)
      .select(IMAGE_SELECT)
      .lean(),

    // Latest
    AniPic.find(BASE_FILTER)
      .sort({ _id: -1 })
      .limit(LANDING_PAGE_IMAGE_LIMIT)
      .select(IMAGE_SELECT)
      .lean(),
  ]);

  return {
    popularTags: tagAgg.map(({ _id, count }) => ({ tag: _id, count })),
    popularPhotos: popularRaw.map(toImageItem),
    mostDownloaded: downloadedRaw.map(toImageItem),
    recentPhotos: recentRaw.map(toImageItem),
  };
}
