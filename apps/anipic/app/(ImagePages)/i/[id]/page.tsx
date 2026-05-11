import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { getImage } from "./_data";
import { DownloadButton, ShareButton } from "./ImageClientAction";
import ZoomableImage from "./ZoomableImage";
import { capitalize } from "@/utils/capitalize";
import { loadImages } from "@/features/images/loadImages";
import MasonryImageGrid from "@/components/MasonryImageGrid";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const img = await getImage(id);

  if (!img) return { title: "Image Not Found", robots: { index: false, follow: false } };

  const canonical = `/i/${img.id}`;

  return {
    title: img.title,
    description: img.description,
    keywords: img.tags,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      siteName: "AniPic",
      type: "article",
      images: [{ url: img.thumbnailUrl, width: img.width, height: img.height, alt: img.title }],
    },
    twitter: { card: "summary_large_image" },
  };
}

async function RelatedPhotos({ skipId, tags }: { skipId: string; tags: string[] }) {
  const { images, hasMore, nextCursor } = await loadImages({ tags, skipId });

  return (
    <section className="mt-16 pt-10 border-t border-neutral-800">
      <h2 className="text-xl font-bold text-white mb-6">Related Art</h2>
      <MasonryImageGrid
        initialImages={images}
        initialHasMore={hasMore}
        initialNextCursor={nextCursor ?? ""}
        tags={tags}
        skipId={skipId}
      />
    </section>
  );
}

export default async function ImagePage({ params }: Props) {
  const { id } = await params;
  const img = await getImage(id);

  if (!img) return notFound();

  const aspectRatio = img.height / img.width;
  const uploadDate = new Date(img.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <p className="sr-only">{img.title}</p>
      <p className="sr-only">{img.description}</p>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <div className="rounded-3xl overflow-hidden bg-neutral-900 flex items-center justify-center">
            <ZoomableImage
              src={img.displayUrl}
              alt={img.title}
              width={900}
              height={Math.round(900 * aspectRatio)}
            />
          </div>
          <p className="mt-3 text-xs text-neutral-600 text-center">
            Click the image to zoom — scroll or pinch to adjust
          </p>
        </div>

        <aside className="lg:w-72 shrink-0 flex flex-col gap-6">
          <div className="flex flex-wrap gap-2">
            <DownloadButton id={img.id} />
            <ShareButton id={img.id} title={img.title} />
          </div>

          <div className="p-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 space-y-3">
            <div>
              <p className="text-xs text-neutral-600 uppercase tracking-wider mb-0.5">Downloads</p>
              <p className="text-white font-semibold text-sm">{img.downloads.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-neutral-600 uppercase tracking-wider mb-0.5">Resolution</p>
              <p className="text-white font-semibold text-sm">
                {img.width} × {img.height}
              </p>
            </div>
            <div>
              <p className="text-xs text-neutral-600 uppercase tracking-wider mb-0.5">Added</p>
              <p className="text-white font-semibold text-sm">{uploadDate}</p>
            </div>
          </div>

          {img.tags.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-3">
                Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {img.tags.map((tag, i) => (
                  <Link
                    key={`${tag.replace(/\s+/g, "-")}-${i}`}
                    href={`/tag/${encodeURIComponent(tag)}`}
                    className="px-3 py-1 text-xs border border-neutral-800 rounded-full hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300 transition-all text-neutral-300"
                  >
                    {capitalize(tag)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <Suspense fallback={null}>
        <RelatedPhotos skipId={img.id} tags={img.tags} />
      </Suspense>
    </>
  );
}
