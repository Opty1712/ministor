import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig(
  {
    ignores: ["**/node_modules/**", "**/dist/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "react/display-name": "off",
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["apps/*/src/**/*.{ts,tsx}", "packages/*/src/**/*.{ts,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ["eslint.config.ts", "**/vite.config.js"],
    languageOptions: { globals: globals.node },
  },

  globalIgnores(["**/.next/**", "**/out/**", "**/build/**", "**/next-env.d.ts"]),
  {
    settings: {
      react: { version: "19.2.4" },
    },
  },
);
