import { cacheLife } from "next/cache";

// eslint-disable-next-line @typescript-eslint/require-await
export default async function DashboardHeading() {
  "use cache";
  cacheLife("hours");

  const now = new Date();

  return (
    <div className="px-6 py-8">
      <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
        {now.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
    </div>
  );
}
