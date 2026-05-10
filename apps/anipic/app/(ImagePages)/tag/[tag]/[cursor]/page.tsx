import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MasonryImageGrid from "@/components/MasonryImageGrid";
import { getAllTags, loadImages } from "@/features/images/loadImages";
import { generateTagCursors } from "@/features/images/generateCursors";
import { capitalize } from "@/utils/capitalize";
import { cacheLife, cacheTag } from "next/cache";
import FilterBar from "@/components/FilterBar";

interface Props {
  params: Promise<{ tag: string; cursor: string }>;
}

export async function generateStaticParams() {
  "use cache";
  cacheLife("days");
  cacheTag("anipicCursors");

  const topTags = await getAllTags("count");

  const allParams: { tag: string; cursor: string }[] = [];

  await Promise.all(
    topTags.map(async (tag) => {
      const cursors = await generateTagCursors(tag); // no limit — all pages
      for (const cursor of cursors) {
        allParams.push({ tag: encodeURIComponent(tag), cursor });
      }
    }),
  );

  if (allParams.length === 0) return [{ tag: "__empty__", cursor: "__empty__" }]; // dummy page to avoid build error when DB is empty

  return allParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${capitalize(decoded)} AI Anime Art · AniPic`,
    description: `Browse AI-generated anime images tagged "${decoded}" on AniPic.`,
    alternates: { canonical: `/tag/${tag}` },
    robots: { index: true, follow: true },
  };
}

export default async function TagCursorPage({ params }: Props) {
  const { tag, cursor } = await params;
  if (tag === "__empty__" || cursor === "__empty__") return notFound(); // handle dummy page for empty DB

  const decoded = decodeURIComponent(tag);

  const { images, hasMore, nextCursor } = await loadImages({
    cursor,
    tags: [decoded],
  });

  if (!images.length) return notFound();

  return (
    <>
      <div className="pt-10 pb-2">
        <h1 className="text-3xl font-black text-white tracking-tight">
          <span className="text-neutral-600">#</span>
          {capitalize(decoded)}
        </h1>
      </div>

      <FilterBar />
      <MasonryImageGrid
        initialImages={images}
        initialHasMore={hasMore}
        initialNextCursor={nextCursor ?? ""}
        tags={[decoded]}
      />
    </>
  );
}
