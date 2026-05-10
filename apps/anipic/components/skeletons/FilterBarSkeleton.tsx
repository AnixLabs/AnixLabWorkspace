import { Shimmer } from "./Shimmer";

export function FilterBarSkeleton() {
  return (
    <div className="py-4 flex flex-col sm:flex-row gap-3">
      {/* Sort tabs */}
      <Shimmer className="h-10 w-72 rounded-2xl shrink-0" />

      {/* Search */}
      <Shimmer className="h-10 flex-1 rounded-xl" />
      <Shimmer className="h-10 w-20 rounded-xl shrink-0" />
    </div>
  );
}
