"use client";

import { useColumnCount } from "@/hooks/useColumnCount";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { VirtuosoMasonry } from "@virtuoso.dev/masonry";
import { Button } from "@shared/components/ui/Button";
import { ImageCard } from "./ImageCard";
import type { ImageItem } from "@/features/images/types";
import { ImageApiResponseSchema, type SortOption } from "@/features/images/schemas";

interface MasonryImageGridProps {
  initialImages: ImageItem[];
  initialHasMore: boolean;
  initialNextCursor: string;
  tags?: string[];
  q?: string;
  sort?: SortOption;
  skipId?: string;
}

export default function MasonryImageGrid({
  initialImages,
  initialHasMore,
  initialNextCursor,
  tags = [],
  q,
  sort = "latest",
  skipId,
}: MasonryImageGridProps) {
  const [images, setImages] = useState<ImageItem[]>(initialImages);
  const [nextCursor, setNextCursor] = useState(initialNextCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [errorLoading, setErrorLoading] = useState(false);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const columnCount = useColumnCount();

  const loadMore = useCallback(async () => {
    if (loading || !hasMore || !nextCursor) return;

    setLoading(true);
    setErrorLoading(false);
    try {
      const params = new URLSearchParams({ cursor: nextCursor });
      if (tags?.length) params.set("tags", tags.join(","));
      if (q) params.set("q", q);
      if (sort && sort !== "latest") params.set("sort", sort);
      if (skipId) params.set("skipId", skipId);

      const res = await fetch(`/api/images?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = ImageApiResponseSchema.parse(await res.json());
      if ("error" in data) throw new Error(data.error);

      setImages((prev) => [...prev, ...data.images]);
      setNextCursor(data.nextCursor ?? "");
      setHasMore(data.hasMore);
    } catch (err) {
      console.error("[MasonryImageGrid] loadMore failed:", err);
      setErrorLoading(true);
      toast.error("Failed to load more images. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, nextCursor, tags, q, sort, skipId]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) void loadMore();
      },
      { rootMargin: "400px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  // Reset when external filters change
  useEffect(() => {
    setImages(initialImages);
    setNextCursor(initialNextCursor);
    setHasMore(initialHasMore);
  }, [initialImages, initialHasMore, initialNextCursor, tags, q, sort, skipId]);

  return (
    <>
      <VirtuosoMasonry
        data={images}
        initialItemCount={initialImages.length}
        columnCount={columnCount}
        ItemContent={ImageCard}
        useWindowScroll
      />

      {errorLoading ? (
        <div className="flex flex-col items-center gap-3 py-10">
          <p className="text-center text-sm text-red-500">Failed to load more images.</p>
          <Button onClick={() => void loadMore()}>Try Again</Button>
        </div>
      ) : (
        <div ref={sentinelRef} className="w-full">
          {loading && (
            <div className="flex justify-center py-10">
              <div className="flex gap-1.5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full bg-neutral-600 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!hasMore && !loading && images.length > 0 && (
        <p className="text-center text-sm text-neutral-600 py-10">You&apos;ve reached the end ✨</p>
      )}

      {!loading && images.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-20 text-center">
          <p className="text-neutral-400 text-lg font-semibold">No images found</p>
          <p className="text-neutral-600 text-sm">Try a different search or filter.</p>
        </div>
      )}
    </>
  );
}

export function LandingPageMasonryGrid({ images }: { images: ImageItem[] }) {
  const columnCount = useColumnCount();

  return (
    <VirtuosoMasonry
      data={images}
      initialItemCount={images.length}
      columnCount={columnCount}
      ItemContent={ImageCard}
      useWindowScroll
    />
  );
}
