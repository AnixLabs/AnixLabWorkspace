import { MasonrySkeleton } from "./MasonrySkeleton";
import { Shimmer } from "./Shimmer";

export default function HomePageSkeleton() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-3.625rem)] lg:min-h-[calc(100vh-3.8125rem)] xl:min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center pb-24 gap-6">
        {/* Badge */}
        <Shimmer className="h-6 w-44 rounded-full" />

        {/* Headline */}
        <div className="flex flex-col items-center gap-3 w-full max-w-2xl">
          <Shimmer className="h-16 sm:h-20 w-3/4 rounded-2xl" />
          <Shimmer className="h-16 sm:h-20 w-full rounded-2xl" />
          <Shimmer className="h-16 sm:h-20 w-2/3 rounded-2xl sm:hidden" />
        </div>

        {/* Subtitle */}
        <div className="flex flex-col items-center gap-2 w-full max-w-lg">
          <Shimmer className="h-4 w-full rounded-full" />
          <Shimmer className="h-4 w-3/4 rounded-full" />
        </div>

        {/* Search bar */}
        <Shimmer className="h-14 w-full max-w-2xl rounded-2xl" />

        {/* CTA buttons */}
        <div className="flex gap-3">
          <Shimmer className="h-12 w-36 rounded-2xl" />
          <Shimmer className="h-12 w-36 rounded-2xl" />
        </div>
      </section>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <Shimmer key={i} className="h-40 rounded-3xl" />
          ))}
        </div>
      </div>

      {/* Tags section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-6">
          <Shimmer className="h-8 w-44 rounded-xl" />
          <Shimmer className="h-4 w-16 rounded-full" />
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 18 }, (_, i) => (
            <Shimmer key={i} className="h-9 rounded-full" style={{ width: 64 + (i % 5) * 20 }} />
          ))}
        </div>
      </div>

      {/* Photo strip × 3 */}
      {[0, 1, 2].map((section) => (
        <div key={section} className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex items-end justify-between mb-6">
            <Shimmer className="h-8 w-48 rounded-xl" />
            <Shimmer className="h-4 w-16 rounded-full" />
          </div>
          <MasonrySkeleton rowsPerColumn={2} />
        </div>
      ))}
    </>
  );
}
