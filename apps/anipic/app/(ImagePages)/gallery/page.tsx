import type { Metadata } from "next";
import MasonryImageGrid from "@/components/MasonryImageGrid";
import { loadImages } from "@/features/images/loadImages";
import type { ImageApiRequestBody } from "@/features/images/schemas";
import FilterBar from "@/components/FilterBar";

type SortOption = NonNullable<ImageApiRequestBody["sort"]>;

interface Props {
  searchParams: Promise<{ q?: string; sort?: string; tags?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q, sort } = await searchParams;

  const sortLabels: Record<string, string> = {
    popular: "Trending",
    downloads: "Most Downloaded",
    views: "Most Viewed",
    latest: "Latest",
  };

  const sortLabel = sort ? (sortLabels[sort] ?? "Latest") : "Latest";
  const title = q ? `Search "${q}" — AniPic AI Art` : `${sortLabel} AI Art — AniPic Gallery`;
  const description = q
    ? `Browse AI-generated art matching "${q}" on AniPic.`
    : `Explore ${sortLabel.toLowerCase()} AI-generated wallpapers and digital art on AniPic.`;

  return { title, description, alternates: { canonical: "/gallery" } };
}

export default async function GalleryPage({ searchParams }: Props) {
  const { q, sort: rawSort, tags: rawTags } = await searchParams;

  const sort = (rawSort as SortOption | undefined) ?? "latest";
  const tags = rawTags ? rawTags.split(",").filter(Boolean) : [];

  const { images, hasMore, nextCursor } = await loadImages({ sort, tags, q });

  return (
    <>
      <div className="px-4 pb-2">
        <h1 className="text-3xl tracking-tight">
          {q ? (
            <>
              Results for <span className="text-theme-400">&ldquo;{q}&rdquo;</span>
            </>
          ) : (
            "Gallery"
          )}
        </h1>
        {tags.length > 0 && (
          <p className="text-neutral-500 text-sm mt-1">
            Filtered by:{" "}
            {tags.map((t) => (
              <span
                key={t}
                className="inline-block px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300 text-xs mr-1"
              >
                {t}
              </span>
            ))}
          </p>
        )}
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
