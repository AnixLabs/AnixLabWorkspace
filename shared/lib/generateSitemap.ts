// shared/lib/generateSitemap.ts
/**
 * Add this to the page you want to add in sitemap:
``` export const metadata = { addToSitemap: true }; ```
 * Use as -
```
import { generateSitemap } from "@shared/lib/generateSitemap";
import path from "path";

export default function sitemap() {
  return generateSitemap({
    baseUrl: process.env.BASE_URL || "https://www.anix7.in",
    appDir: path.join(process.cwd(), "app"),
  });
}
```
 */

import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import * as babelParser from "@babel/parser";
import traverse from "@babel/traverse";
import type { MetadataRoute } from "next";

export function generateSitemap(options: {
  baseUrl: string;
  appDir: string; // absolute path to app/ dir
}): MetadataRoute.Sitemap {
  const { baseUrl, appDir } = options;

  const getLastModified = (filePath: string) => {
    try {
      const stdout = execSync(`git log -1 --format="%cI" -- "${filePath}"`, {
        encoding: "utf-8",
      }).trim();

      const date = new Date(stdout);
      return isNaN(date.getTime()) ? new Date() : date;
    } catch {
      return new Date();
    }
  };

  const getAllPages = (base: string) => {
    const files: { route: string; filePath: string }[] = [];

    function walk(dir: string, routeBase = "") {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          walk(path.join(dir, entry.name), `${routeBase}/${entry.name}`);
        } else if (
          entry.isFile() &&
          (entry.name === "page.js" || entry.name === "page.jsx" || entry.name === "page.tsx")
        ) {
          const filePath = path.join(dir, entry.name);
          const content = fs.readFileSync(filePath, "utf-8");

          try {
            const ast = babelParser.parse(content, {
              sourceType: "module",
              plugins: ["typescript", "jsx"],
            });

            let hasAddToSitemap = false;

            traverse(ast, {
              ExportNamedDeclaration(path) {
                const decl = path.node.declaration;
                if (decl?.type === "VariableDeclaration") {
                  for (const d of decl.declarations) {
                    if (
                      d.type === "VariableDeclarator" &&
                      d.id.type === "Identifier" &&
                      d.id.name === "metadata" &&
                      d.init?.type === "ObjectExpression"
                    ) {
                      for (const prop of d.init.properties) {
                        if (
                          prop.type === "ObjectProperty" &&
                          ((prop.key.type === "Identifier" && prop.key.name === "addToSitemap") ||
                            (prop.key.type === "StringLiteral" &&
                              prop.key.value === "addToSitemap")) &&
                          prop.value.type === "BooleanLiteral" &&
                          prop.value.value === true
                        ) {
                          hasAddToSitemap = true;
                        }
                      }
                    }
                  }
                }
              },
            });

            if (hasAddToSitemap) {
              files.push({
                route: routeBase === "" ? "/" : routeBase,
                filePath,
              });
            }
          } catch (err) {
            console.error(`Error parsing file ${filePath}:`, err);
          }
        }
      }
    }

    walk(base);
    return files;
  };

  const pages = getAllPages(appDir);
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  return pages
    .map(({ route, filePath }) => ({
      url: `${normalizedBaseUrl}${(route === "/" ? "" : route.replace(/\(.*?\)/g, "")).replace(
        /^\/+/,
        "/"
      )}`,
      lastModified: getLastModified(filePath),
    }))
    .sort((a, b) => (a.url === normalizedBaseUrl ? -1 : b.url === normalizedBaseUrl ? 1 : 0));
}
