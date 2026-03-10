// eslint/node.mjs
import { defineConfig } from "eslint/config";
import base from "./base.mjs";

export default defineConfig([
  base,

  {
    files: ["**/*.ts", "**/*.tsx", "tsup.config.ts", "scripts/**/*.ts"],

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
