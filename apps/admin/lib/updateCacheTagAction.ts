"use server";

import { auth } from "@shared/auth";
import { updateTag } from "next/cache";
import { headers } from "next/headers";

export async function updateCacheTagAction(_: { error?: string } | null, formData: FormData) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user) {
      return { error: "Unauthorized" };
    }

    const { success: hasAccess } = await auth.api.userHasPermission({
      body: {
        userId: session.user.id,
        permissions: { user: ["list"] },
      },
    });

    if (!hasAccess) {
      return { error: "Forbidden" };
    }

    const tag = formData.get("tag");

    if (typeof tag !== "string") {
      return { error: "Invalid tag" };
    }

    updateTag(tag);

    return { error: undefined };
  } catch {
    return { error: "Failed to refresh cache" };
  }
}
