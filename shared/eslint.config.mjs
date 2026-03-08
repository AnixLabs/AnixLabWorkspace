import nextConfig from "./config/eslint/next.mjs";
import { defineConfig } from "eslint/config";

export default defineConfig([
  ...nextConfig,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
]);
