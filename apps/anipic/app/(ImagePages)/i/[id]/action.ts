"use server";

import getAniPicModel from "@/lib/db/models/AniPic";
import { createDownloadToken } from "@/utils/createDownloadToken";

const DOWNLOAD_BASE = process.env.DOWNLOAD_BASE;

if (!DOWNLOAD_BASE) {
  throw new Error("DOWNLOAD_BASE environment variable is not defined");
}

export type DownloadResult =
  | { success: true; downloadUrl: string }
  | { success: false; message: string };

export async function getDownloadUrl(id: string): Promise<DownloadResult> {
  try {
    const AniPic = await getAniPicModel();

    const img = await AniPic.findOneAndUpdate(
      { _id: id, approved: true },
      { $inc: { downloads: 1 } },
      { new: true },
    );

    if (!img) return { success: false, message: "Image not found or not approved" };

    const title = `AniPic — ${img.tags.slice(0, 3).join(", ")}`;

    const token = createDownloadToken({
      u: img.originalUrl,
      w: img.width ?? 4000,
      h: img.height ?? 4000,
      t: title,
    });

    const downloadUrl = new URL(`?token=${token}`, DOWNLOAD_BASE).toString();

    return { success: true, downloadUrl };
  } catch (err) {
    console.error("[getDownloadUrl]", err);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
}
