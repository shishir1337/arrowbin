import "server-only";
import { Pool } from "pg";

/**
 * Postgres on Neon, through node-postgres. The site runs as one long-lived
 * `next start` server behind Cloudflare, so a small pool reused across
 * requests is the right shape (Neon's guidance for long-running servers);
 * `DATABASE_URL` is Neon's pooled (PgBouncer) endpoint. Schema changes go
 * through `pnpm db:migrate`, which uses the direct endpoint instead.
 *
 * Kept on globalThis so `next dev` reloads don't open a new pool each time.
 */
const globalForDb = globalThis as typeof globalThis & { arrowbinDb?: Pool };

/** True when a database is configured. Without one, the blog shows only the
 * posts in src/lib/posts and the RankYak webhook answers 500. */
export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function db(): Pool {
  if (globalForDb.arrowbinDb) return globalForDb.arrowbinDb;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  const pool = new Pool({
    connectionString,
    max: 5,
    // Neon suspends an idle compute after 5 minutes and drops its
    // connections; let idle clients go before that happens.
    idleTimeoutMillis: 60_000,
    // The first query after a suspend waits for the compute to wake up.
    connectionTimeoutMillis: 15_000,
  });
  // A dropped idle connection emits an error on the pool. Without a listener
  // it would crash the server; the next query simply opens a new connection.
  pool.on("error", (error) => {
    console.error("[db] idle client error:", error.message);
  });
  globalForDb.arrowbinDb = pool;
  return pool;
}
