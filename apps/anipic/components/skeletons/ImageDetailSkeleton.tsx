import { MasonrySkeleton } from "./MasonrySkeleton";
import { Shimmer } from "./Shimmer";

export function ImageDetailSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main image */}
        <Shimmer className="flex-1 rounded-3xl min-h-105 lg:min-h-130" />

        {/* Sidebar */}
        <div className="lg:w-72 shrink-0 flex flex-col gap-5">
          {/* Action buttons */}
          <div className="flex gap-2">
            <Shimmer className="h-10 w-28 rounded-xl" />
            <Shimmer className="h-10 w-20 rounded-xl" />
            <Shimmer className="h-10 w-20 rounded-xl" />
          </div>

          {/* Meta card */}
          <Shimmer className="h-32 rounded-2xl" />

          {/* Tags label */}
          <Shimmer className="h-3 w-10 rounded-full" />

          {/* Tag chips */}
          <div className="flex flex-wrap gap-2">
            {[72, 96, 56, 80, 64, 88, 52, 76].map((w, i) => (
              <Shimmer key={i} className="h-7 rounded-full" style={{ width: w }} />
            ))}
          </div>
        </div>
      </div>

      {/* Related section */}
      <div className="mt-16 pt-10 border-t border-neutral-800">
        <Shimmer className="h-6 w-32 rounded-xl mb-6" />
        <MasonrySkeleton rowsPerColumn={3} />
      </div>
    </div>
  );
}
