import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MasonryImageGrid from "@/components/MasonryImageGrid";
import { loadImages } from "@/features/images/loadImages";
import { generateGalleryCursors } from "@/features/images/generateCursors";
import type { ImageApiRequestBody } from "@/features/images/schemas";
import FilterBar from "@/components/FilterBar";

type SortOption = NonNullable<ImageApiRequestBody["sort"]>;

interface Props {
  params: Promise<{ cursor: string }>;
  searchParams: Promise<{ sort?: string; q?: string; tags?: string }>;
}

export async function generateStaticParams() {
  const cursors = await generateGalleryCursors(); // no limit — all pages

  if (cursors.length === 0) return [{ cursor: "__empty__" }]; // dummy page to avoid build error when DB is empty
  return cursors.map((cursor) => ({ cursor }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { cursor } = await params;
  return {
    title: "Browse AI Anime Art · AniPic Gallery",
    description: "Explore AI-generated anime wallpapers, illustrations, and digital art on AniPic.",
    alternates: { canonical: `/gallery/${cursor}` },
    robots: { index: true, follow: true },
  };
}

export default async function GalleryCursorPage({ params, searchParams }: Props) {
  const { cursor } = await params;
  if (cursor === "__empty__") return notFound(); // handle dummy page for empty DB

  const { sort: rawSort, q, tags: rawTags } = await searchParams;

  const sort = (rawSort as SortOption | undefined) ?? "latest";
  const tags = rawTags ? rawTags.split(",").filter(Boolean) : [];

  const { images, hasMore, nextCursor } = await loadImages({ cursor, sort, tags, q });

  if (!images.length) return notFound();

  return (
    <>
      <div className="pt-10 pb-2">
        <h1 className="text-3xl font-black text-white tracking-tight">Gallery</h1>
        <p className="text-neutral-500 text-sm mt-1">
          AI-generated anime art, wallpapers, and illustrations
        </p>
      </div>

      <FilterBar currentSort={sort} currentQ={q} />
      <MasonryImageGrid
        initialImages={images}
        initialHasMore={hasMore}
        initialNextCursor={nextCursor ?? ""}
        sort={sort}
        tags={tags}
        q={q}
      />
    </>
  );
}
