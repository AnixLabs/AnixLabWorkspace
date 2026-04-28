"use server";

import { auth } from "@shared/auth";
import getAniPicModel from "@/lib/db/models/AniPic";
import { headers } from "next/headers";
import { z } from "zod";
import { updateTag } from "next/cache";

/* ---------------- ZOD SCHEMA ---------------- */

const uploadImageSchema = z.object({
  originalUrl: z.url(),
  displayUrl: z.url(),
  thumbnailUrl: z.url(),

  width: z.coerce.number().int().positive(),
  height: z.coerce.number().int().positive(),

  tags: z
    .string()
    .optional()
    .transform((val) =>
      val
        ? val
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    ),
});

export type UploadImageState =
  | { success: false; error: string }
  | { success: true; message: string };

/* ---------------- SERVER ACTION ---------------- */

export async function uploadImageAction(
  _prevState: UploadImageState,
  formData: FormData,
): Promise<UploadImageState> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const { success: hasPermission } = await auth.api.userHasPermission({
      body: {
        userId: session?.user?.id,
        permissions: { anipic: ["upload"] },
      },
    });
    if (!session?.user || !hasPermission) {
      return { success: false, error: "Unauthorized" };
    }

    /* -------- Convert FormData → Object -------- */
    const raw = Object.fromEntries(formData.entries());

    const parsed = uploadImageSchema.safeParse(raw);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Validation error",
      };
    }

    const { originalUrl, displayUrl, thumbnailUrl, width, height, tags } = parsed.data;

    const AniPic = await getAniPicModel();

    /* -------- Generate serial number -------- */
    const last = await AniPic.findOne().sort({ sno: -1 }).lean();
    const sno = last ? last.sno + 1 : 1;

    await AniPic.create({
      sno,

      originalUrl,
      displayUrl,
      thumbnailUrl,

      width,
      height,

      tags,

      uploadedBy: session.user.id,
      approved: hasPermission,

      downloads: 0,
      views: 0,
      likes: 0,

      isDeleted: false,
      dmcaFlag: false,
    });

    updateTag("anipicImagePages");

    return {
      success: true,
      message: "✅ Image uploaded successfully (pending approval)",
    };
  } catch (err) {
    console.error("Upload failed:", err);
    return { success: false, error: "Upload failed. Try again later." };
  }
}
