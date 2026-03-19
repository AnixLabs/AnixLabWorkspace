import { generateSitemap } from "@shared/lib/generateSitemap";
import path from "path";

export default function sitemap() {
  return generateSitemap({
    baseUrl: process.env.BASE_URL ?? "https://tools.anixlab.in",
    appDir: path.join(process.cwd(), "app"),
  });
}
