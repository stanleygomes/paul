import "dotenv/config";
import type { Config } from "drizzle-kit";

const databaseUrlString = process.env.DATABASE_URL;

if (!databaseUrlString) {
  console.warn(
    "WARNING: DATABASE_URL is not set. Migration might fail if a connection is required.",
  );
}

const databaseUrl = new URL(
  databaseUrlString || "postgres://username:password@localhost:5432/database",
);

databaseUrl.searchParams.delete("sslmode");

export default {
  schema: "./src/schemas/database/index.ts",
  out: process.env.DATABASE_MIGRATIONS_FOLDER || "./src/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl.toString(),
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
} satisfies Config;
