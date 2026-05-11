import { cacheLife, cacheTag } from "next/cache";
import { Types } from "mongoose";

import getAniPicModel from "@/lib/db/models/AniPic";
import { buildSeoTitle } from "@/utils/seo/buildSeoUsingTags";

import type { CursorPayload, ImageItem } from "./types";
import type { ImageApiRequestBody } from "./schemas";
import { BASE_FILTER, IMAGE_LIMIT_PER_LOAD } from "./const";
import { decodeCursor, encodeCursor } from "./utils";

type ImageSort = NonNullable<ImageApiRequestBody["sort"]>;

interface LoadImagesOptions {
  cursor?: string | null;
  tags?: string[];
  q?: string;
  sort?: ImageSort;
  skipId?: string; // For related images, to exclude the current image
}

function buildBaseFilter(tags: string[], q?: string) {
  const and: Record<string, unknown>[] = [BASE_FILTER];

  if (tags.length > 0) and.push({ tags: { $all: tags } });

  if (q?.trim()) and.push({ tags: { $regex: q.trim(), $options: "i" } });

  return { $and: and };
}

function buildCursorCondition(sort: ImageSort, decodedCursor: CursorPayload) {
  const objectId = new Types.ObjectId(decodedCursor.id);

  switch (sort) {
    case "popular":
      return {
        $or: [
          { likes: { $lt: decodedCursor.value ?? 0 } },
          { likes: decodedCursor.value ?? 0, _id: { $lt: objectId } },
        ],
      };

    case "views":
      return {
        $or: [
          { views: { $lt: decodedCursor.value ?? 0 } },
          { views: decodedCursor.value ?? 0, _id: { $lt: objectId } },
        ],
      };

    case "downloads":
      return {
        $or: [
          { downloads: { $lt: decodedCursor.value ?? 0 } },
          { downloads: decodedCursor.value ?? 0, _id: { $lt: objectId } },
        ],
      };

    case "latest":
    default:
      return { _id: { $lt: objectId } };
  }
}

export async function loadImages({
  cursor,
  tags = [],
  q,
  sort = "latest",
  skipId,
}: LoadImagesOptions = {}) {
  "use cache";
  cacheLife("max");
  cacheTag("anipicImagePages");

  const AniPic = await getAniPicModel();
  const decodedCursor = decodeCursor(cursor);

  const baseFilter = buildBaseFilter(tags, q);

  if (skipId) {
    const objectId = new Types.ObjectId(skipId);
    baseFilter.$and.push({ _id: { $ne: objectId } });
  }

  const total = await AniPic.countDocuments(baseFilter);

  const sortQuery = ((): Record<string, 1 | -1> => {
    switch (sort) {
      case "popular":
        return { likes: -1, _id: -1 };
      case "views":
        return { views: -1, _id: -1 };
      case "downloads":
        return { downloads: -1, _id: -1 };
      case "latest":
      default:
        return { _id: -1 };
    }
  })();

  const queryFilter = decodedCursor
    ? { $and: [...baseFilter.$and, buildCursorCondition(sort, decodedCursor)] }
    : baseFilter;

  const raw = await AniPic.find(queryFilter)
    .sort(sortQuery)
    .limit(IMAGE_LIMIT_PER_LOAD + 1)
    .select({
      _id: 1,
      thumbnailUrl: 1,
      width: 1,
      height: 1,
      tags: 1,
      likes: 1,
      views: 1,
      downloads: 1,
    })
    .lean();

  const hasMore = raw.length > IMAGE_LIMIT_PER_LOAD;
  const sliced = hasMore ? raw.slice(0, IMAGE_LIMIT_PER_LOAD) : raw;

  const images: ImageItem[] = sliced.map((img) => ({
    id: img._id.toString(),
    thumbnailUrl: img.thumbnailUrl,
    width: img.width ?? 512,
    height: img.height ?? 512,
    title: buildSeoTitle(img.tags),
  }));

  const last = sliced[sliced.length - 1];
  let nextCursor: string | null = null;

  if (last) {
    switch (sort) {
      case "popular":
        nextCursor = encodeCursor({ id: last._id.toString(), value: last.likes ?? 0 });
        break;

      case "views":
        nextCursor = encodeCursor({ id: last._id.toString(), value: last.views ?? 0 });
        break;

      case "downloads":
        nextCursor = encodeCursor({ id: last._id.toString(), value: last.downloads ?? 0 });
        break;

      case "latest":
      default:
        nextCursor = encodeCursor({ id: last._id.toString() });
        break;
    }
  }

  return { images, total, hasMore, nextCursor };
}

export async function getAllTags(shortBy: "name" | "count" = "name"): Promise<string[]> {
  "use cache";
  cacheLife("days");
  cacheTag("anipicTags");

  const AniPic = await getAniPicModel();

  const tagAgg = await AniPic.aggregate<{ _id: string; count: number }>([
    { $match: BASE_FILTER },
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: shortBy === "count" ? { count: -1 } : { _id: 1 } },
  ]);

  return tagAgg.map(({ _id }) => _id);
}
