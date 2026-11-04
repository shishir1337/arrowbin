// Applies the SQL files in db/migrations/ in name order, once each, and records
// them in a `schema_migrations` table. Run with `pnpm db:migrate`.
//
// Uses the direct (unpooled) Neon connection when there is one: Neon's pooled
// endpoint runs PgBouncer in transaction mode, which is meant for the app's
// queries, not for schema changes.

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import pg from "pg";

const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set (put it in .env.local).");
  process.exit(1);
}

const dir = join(import.meta.dirname, "..", "db", "migrations");
const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();

const client = new pg.Client({ connectionString: url });
await client.connect();
try {
  await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    name text PRIMARY KEY,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`);
  const { rows } = await client.query("SELECT name FROM schema_migrations");
  const applied = new Set(rows.map((r) => r.name));
  let ran = 0;
  for (const file of files) {
    if (applied.has(file)) continue;
    const sql = await readFile(join(dir, file), "utf8");
    // One transaction per file: a failing migration leaves nothing behind.
    await client.query("BEGIN");
    try {
      await client.query(sql);
      await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [
        file,
      ]);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw new Error(`${file}: ${error.message}`);
    }
    console.log(`Applied ${file}`);
    ran += 1;
  }
  console.log(ran ? `${ran} migration(s) applied.` : "Database is up to date.");
} finally {
  await client.end();
}
