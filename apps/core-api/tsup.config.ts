import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["api/server.ts", "src/index.ts"],
  format: ["esm"],
  clean: true,
  bundle: true,
  minify: false,
  sourcemap: true,
  dts: false,
  outDir: "dist",
  external: ["fastify", "pg", "pino"],
  noExternal: ["@paul/node-utils", "@paul/http", "@paul/utils", "dotenv"],
  publicDir: "src/database/migrations",
});
