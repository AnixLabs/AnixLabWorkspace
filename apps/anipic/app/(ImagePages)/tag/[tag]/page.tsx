import type { Metadata } from "next";
import MasonryImageGrid from "@/components/MasonryImageGrid";
import { loadImages } from "@/features/images/loadImages";
import { capitalize } from "@/utils/capitalize";
import FilterBar from "@/components/FilterBar";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  return {
    title: `#${capitalize(decoded)} AI Art · AniPic`,
    description: `Browse AI-generated images tagged "${decoded}" on AniPic.`,
    alternates: { canonical: `/tag/${tag}` },
  };
}

export default async function TagFirstPage({ params }: Props) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);

  const { images, total, hasMore, nextCursor } = await loadImages({
    tags: [decoded],
  });

  return (
    <>
      <div className="pt-10 pb-2">
        <h1 className="text-3xl font-black text-white tracking-tight">
          <span className="text-neutral-600">#</span>
          {capitalize(decoded)}
        </h1>
        <p className="text-neutral-500 text-sm mt-1">{total.toLocaleString()} images</p>
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
