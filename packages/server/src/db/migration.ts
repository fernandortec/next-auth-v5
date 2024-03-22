import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import { env } from "@repo/schemas";
import { drizzle } from "drizzle-orm/postgres-js";

const connection = postgres(env.DATABASE_URL, { max: 1 });

const db = drizzle(connection);

await migrate(db, { migrationsFolder: "drizzle" });

process.exit(0);
