import { Shimmer } from "./Shimmer";

export function GalleryHeaderSkeleton() {
  return (
    <div className="pt-10 pb-2 flex items-end justify-between">
      <div className="flex flex-col gap-2">
        <Shimmer className="h-9 w-36 rounded-xl" />
        <Shimmer className="h-4 w-60 rounded-full" />
      </div>
    </div>
  );
}
