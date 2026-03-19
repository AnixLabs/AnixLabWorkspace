import { generateSitemap } from "@shared/lib/generateSitemap";
import path from "path";

export default function sitemap() {
  return generateSitemap({
    baseUrl: process.env.BASE_URL ?? "https://www.anixlab.in",
    appDir: path.join(process.cwd(), "app"),
  });
}
