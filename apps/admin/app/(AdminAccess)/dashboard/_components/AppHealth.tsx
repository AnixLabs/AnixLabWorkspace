import { Panel, PanelHeader } from "@/components/ui/Panel";
import { checkAllAppsHealth, type AppHealth } from "../_lib/checkAllAppsHealth";
import { Pill, type PillStatus } from "@/components/ui/Pill";
import { cn } from "@shared/utils/cn";
import UpdateCacheTag from "@/components/UpdateCacheTag";
import Image from "next/image";

export default async function AppHealth() {
  const apps = await checkAllAppsHealth();

  const onlineApps = apps.filter((a) => a.status === "online").length;
  const degradedApps = apps.filter((a) => a.status === "degraded").length;
  const offlineApps = apps.filter((a) => a.status === "offline").length;

  return (
    <Panel>
      <PanelHeader right={<UpdateCacheTag tag="app-health" />}>App Health</PanelHeader>
      <div>
        {apps.map((app) => (
          <AppHealthRow key={app.config.url} app={app} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["Online", onlineApps, "bg-emerald-500/10 text-emerald-400"],
          ["Degraded", degradedApps, "bg-amber-500/10 text-amber-400"],
          ["Offline", offlineApps, "bg-red-500/10 text-red-400"],
        ].map(([label, count, cls]) => (
          <div
            key={String(label)}
            className={`rounded-lg px-3 py-2 text-center text-xs font-medium ${cls}`}
          >
            {count} {label}
          </div>
        ))}
      </div>
    </Panel>
  );
}

function AppHealthRow({ app }: { app: AppHealth }) {
  const { status, config, latencyMs } = app;

  const pillStatus: PillStatus =
    status === "online"
      ? "success"
      : status === "degraded"
        ? "warning"
        : status === "offline"
          ? "error"
          : "unknown";

  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/4 last:border-0">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0 border-2 border-white shadow-[0_0_8px_4px] shadow-theme-500">
        <Image
          src={`https://www.google.com/s2/favicons?domain=${new URL(config.url).toString()}&sz=32`}
          alt="Site icon"
          width={20}
          height={20}
          className="rounded-full w-full"
          unoptimized
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-zinc-100 leading-tight">{config.name}</p>
        <p className="text-[11px] text-zinc-600 font-mono truncate">{config.url}</p>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        {app.latencyMs !== null && (
          <span
            className={cn(
              "text-xs font-mono font-semibold tabular-nums",
              status === "online"
                ? "text-emerald-400"
                : status === "degraded"
                  ? "text-amber-400"
                  : "text-red-500",
            )}
          >
            {latencyMs !== null ? `${latencyMs}ms` : "N/A"}
          </span>
        )}
        <Pill status={pillStatus}>
          {status.charAt(0).toUpperCase()}
          {status.slice(1)}
        </Pill>
      </div>
    </div>
  );
}
