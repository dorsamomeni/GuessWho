// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      quotes: ["error", "single", { avoidEscape: true }],
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: [
      "babel.config.js",
      "metro.config.js",
      "tailwind.config.js",
      "jest.config.js",
      "jest.setup.js",
    ],
    languageOptions: {
      sourceType: "script",
      globals: {
        module: "readonly",
        require: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
      },
    },

    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off",
    },
  },
]);
