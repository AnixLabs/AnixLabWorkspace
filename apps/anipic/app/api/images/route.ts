import { loadImages } from "@/features/images/loadImages";
import { ImageApiRequestBodySchema } from "@/features/images/schemas";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const parseData = ImageApiRequestBodySchema.safeParse({
    cursor: searchParams.get("cursor") ?? undefined,
    tags: searchParams.get("tags") ?? undefined,
    q: searchParams.get("q") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
    skipId: searchParams.get("skipId") ?? undefined,
  });

  if (!parseData.success) {
    return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
  }

  const { cursor, tags, q, sort, skipId } = parseData.data;

  try {
    const { images, hasMore, nextCursor } = await loadImages({ cursor, tags, q, sort, skipId });

    return NextResponse.json({ images, hasMore, nextCursor });
  } catch (err) {
    console.error("[GET /api/images]", err);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}
