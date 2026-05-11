import { FilterBarSkeleton } from "@/components/skeletons/FilterBarSkeleton";
import { GalleryHeaderSkeleton } from "@/components/skeletons/GalleryHeaderSkeleton";
import { MasonrySkeleton } from "@/components/skeletons/MasonrySkeleton";

export default function GalleryLoading() {
  return (
    <>
      <GalleryHeaderSkeleton />
      <FilterBarSkeleton />
      <MasonrySkeleton rowsPerColumn={6} />
    </>
  );
}
