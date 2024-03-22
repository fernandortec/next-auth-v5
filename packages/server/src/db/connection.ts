import { type NeonQueryFunction, neon } from "@neondatabase/serverless";

import { env } from "@repo/schemas";
import { drizzle } from "drizzle-orm/neon-http";

const connection: NeonQueryFunction<boolean, boolean> = neon(env.DATABASE_URL);

export const db = drizzle(connection);
