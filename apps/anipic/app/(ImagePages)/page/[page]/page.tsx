import ImageGrid, { type SafeImages } from "@/components/imageGrid";
import { IMAGE_LIMIT_PER_PAGE } from "@/utils/const";
import getAniPicModel from "@/lib/db/models/AniPic";
import type { Metadata } from "next";
import { cacheLife, cacheTag } from "next/cache";
import { notFound } from "next/navigation";
import { buildSeoTitle } from "@/utils/seo/buildSeoUsingTags";
import { Button } from "@shared/components/ui/Button";

interface Params {
  params: Promise<{ page: string }>;
}

/* --------------------------- Static Params --------------------------- */
export async function generateStaticParams() {
  const AniPic = await getAniPicModel();
  const total = await AniPic.countDocuments({ approved: true });
  const totalPages = Math.ceil(total / IMAGE_LIMIT_PER_PAGE);
  const length = Math.min(totalPages, 50);

  return Array.from({ length }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

/* --------------------------- Dynamic Metadata --------------------------- */
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const pageNum = Math.max(parseInt((await params).page), 1);
  const title = `Browse AI Generated Images - Page ${pageNum}`;

  const description = `Explore high-quality AI generated images, wallpapers, and digital art on AniPic - Page ${pageNum} of our curated collection.`;

  return {
    title,
    description,
    alternates: { canonical: `/page/${pageNum}` },
  };
}

/* --------------------------- Page Component --------------------------- */

export default async function AniPicPage({ params }: Params) {
  "use cache";
  cacheLife("max");
  cacheTag("anipicImagePages");

  const { page } = await params;
  const pageNum = Math.max(parseInt(page), 1);

  cacheTag(`anipicImagePage:${pageNum}`);

  const AniPic = await getAniPicModel();

  const [images, total] = await Promise.all([
    AniPic.find({ approved: true })
      .sort({ createdAt: -1 })
      .skip(pageNum * IMAGE_LIMIT_PER_PAGE)
      .limit(IMAGE_LIMIT_PER_PAGE)
      .lean(),
    AniPic.countDocuments({ approved: true }),
  ]);

  const totalPages = Math.ceil(total / IMAGE_LIMIT_PER_PAGE);

  if (pageNum > totalPages - 1) {
    return notFound();
  }

  const safeImages: SafeImages[] = images.map((img) => ({
    sno: img.sno,
    thumbnailUrl: img.thumbnailUrl,
    width: img.width,
    height: img.height,
    title: buildSeoTitle(img.tags),
  }));

  return (
    <section>
      <ImageGrid images={safeImages} />

      {/* Pagination controls */}
      <div className="flex justify-between mt-6 space-x-2">
        {/* Previous Button */}
        <Button href={pageNum > 1 ? `/page/${Math.min(totalPages, pageNum - 1)}` : "/"}>
          ← Prev
        </Button>

        {/* Next Button */}
        {pageNum + 1 < totalPages && <Button href={`/page/${pageNum + 1}`}>Next →</Button>}
      </div>
    </section>
  );
}
