import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { getImage } from "@/app/(ImagePages)/i/[id]/_data";
import { DownloadButton, ShareButton } from "@/app/(ImagePages)/i/[id]/ImageClientAction";
import { capitalize } from "@/utils/capitalize";
import ModalBackdrop from "./ModalBackdrop";
import ImagePageLoading from "@/app/(ImagePages)/i/[id]/loading";
import { Button } from "@shared/components/ui/Button";

interface Props {
  params: Promise<{ id: string }>;
}

export default function ImageModal({ params }: Props) {
  return (
    <ModalBackdrop>
      <Suspense fallback={<ImagePageLoading />}>
        <ImagePreview params={params} />
      </Suspense>
    </ModalBackdrop>
  );
}

async function ImagePreview({ params }: Props) {
  const { id } = await params;
  const img = await getImage(id);

  if (!img) return notFound();

  const aspectRatio = img.height / img.width;

  return (
    <div className="flex flex-col gap-2 md:flex-row overflow-hidden rounded-3xl">
      <div className="flex-1 bg-neutral-900 flex items-center justify-center min-h-52">
        <Image
          src={img.displayUrl}
          unoptimized
          alt={img.title}
          width={720}
          height={Math.round(720 * aspectRatio)}
          className="w-full max-h-[60vh] object-contain"
          priority
        />
      </div>
      <p className="flex gap-5 justify-center text-xs text-neutral-600">
        <span className="flex-1 text-right">
          {img.downloads.toLocaleString()} Download{img.downloads > 1 ? "s" : ""}
        </span>
        •
        <span className="flex-1">
          {img.likes.toLocaleString()} Like{img.likes > 1 ? "s" : ""}
        </span>
      </p>

      <div className="md:w-64 shrink-0 p-6 flex flex-col gap-5 border-l border-neutral-800">
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <DownloadButton id={img.id} />
          <ShareButton id={img.id} title={img.title} />
        </div>

        <Link
          href={`/i/${img.id}`}
          className="text-xs text-neutral-500 hover:text-rose-400 underline underline-offset-2 transition-colors w-fit"
        >
          Open full page ↗
        </Link>

        {/* Tags */}
        {img.tags.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 dark:text-neutral-400 mb-3">
              Tags
            </p>
            <div className="flex flex-wrap gap-1.5">
              {img.tags.map((tag, i) => (
                <Button
                  key={`${tag.replace(/\s+/g, "-")}-${i}`}
                  href={`/tag/${encodeURIComponent(tag)}`}
                  className="py-0 m-0 rounded-full border border-theme-600 bg-theme-500/10 text-neutral-600 dark:text-neutral-400"
                >
                  {capitalize(tag)}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
