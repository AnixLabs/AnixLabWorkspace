// eslint/next.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import base from "./base.mjs";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  base,
  ...nextVitals,
  ...nextTs,

  // Override default ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/**",
    "node_modules/**",
    "dist/**",
  ]),
  {
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/exhaustive-deps": "off",
    },
  },
]);
