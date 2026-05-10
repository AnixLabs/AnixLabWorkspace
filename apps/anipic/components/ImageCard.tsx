import Image from "next/image";
import Link from "next/link";
import type { ImageItem } from "../features/images/types";

export const ImageCard: React.FC<{ data: ImageItem }> = ({ data: item }) => {
  const aspectRatio = (item.height ?? 512) / (item.width ?? 512);

  return (
    <div className="p-1.5">
      <Link
        href={`/i/${item.id}`}
        scroll={false}
        className="group block overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900"
      >
        <div style={{ paddingBottom: `${aspectRatio * 100}%` }} className="relative w-full">
          <Image
            src={item.thumbnailUrl}
            alt={item.title}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <p className="text-white text-xs font-medium translate-y-1 group-hover:translate-y-0 transition-transform duration-300 line-clamp-2">
              {item.title}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
