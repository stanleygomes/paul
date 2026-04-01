import { nextJsConfig } from "@paul/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ["public/sw.js"],
  },
  ...nextJsConfig,
];
