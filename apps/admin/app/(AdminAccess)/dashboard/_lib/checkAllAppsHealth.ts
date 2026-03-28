import { cacheLife, cacheTag } from "next/cache";

type AppStatus = "online" | "degraded" | "offline" | "unknown";

interface AppConfig {
  name: string;
  url: string;
  healthEndpoint: string;
}

export interface AppHealth {
  config: AppConfig;
  status: AppStatus;
  latencyMs: number | null;
  statusCode: number | null;
  checkedAt: Date;
}

// App configs
const APP_CONFIGS: AppConfig[] = [
  {
    name: "Anix Lab",
    url: process.env.APP_WEB_URL ?? "https://www.anixlab.in",
    healthEndpoint: "/api/health",
  },
  {
    name: "AdminOS",
    url: process.env.BASE_URL ?? "https://admin.anixlab.in",
    healthEndpoint: "/api/health",
  },
  {
    name: "Core Server",
    url: process.env.APP_API_URL ?? "https://api.anixlab.in",
    healthEndpoint: "/v1/health",
  },
  {
    name: "AniPic",
    url: process.env.APP_ANIPIC_URL ?? "https://anipic.anixlab.in",
    healthEndpoint: "/api/health",
  },
  {
    name: "Anix Lab Tools",
    url: process.env.APP_TOOLS_URL ?? "https://tools.anixlab.in",
    healthEndpoint: "/api/health",
  },
  {
    name: "Url Shortener Redirect Service",
    url: process.env.APP_URL_SHORTENER_URL ?? "https://i.anixlab.in",
    healthEndpoint: "/api/health",
  },
];

// App health checks
async function checkApp(app: AppConfig): Promise<AppHealth> {
  const url = `${app.url}${app.healthEndpoint}`;
  const start = Date.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    const latencyMs = Date.now() - start;

    const onlineStatus = res.status >= 200 && res.status < 300 && latencyMs < 800;
    const status: AppStatus = onlineStatus ? "online" : res.status >= 500 ? "offline" : "degraded";

    return { config: app, status, latencyMs, statusCode: res.status, checkedAt: new Date() };
  } catch {
    return {
      config: app,
      status: "offline",
      latencyMs: null,
      statusCode: null,
      checkedAt: new Date(),
    };
  }
}

export async function checkAllAppsHealth(): Promise<AppHealth[]> {
  "use cache";
  cacheTag("app-health");
  cacheLife("minutes");

  return Promise.all(APP_CONFIGS.map(checkApp));
}
