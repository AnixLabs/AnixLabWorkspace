import { cacheLife } from "next/cache";

// eslint-disable-next-line @typescript-eslint/require-await
export default async function DashboardPage() {
  "use cache";
  cacheLife("hours");

  const now = new Date();

  return (
    <div className="relative z-10 max-w-350 mx-auto px-6 py-8 space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-zinc-600 uppercase tracking-widest">
              {now.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
