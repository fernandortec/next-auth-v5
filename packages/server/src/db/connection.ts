import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

import { drizzle } from "drizzle-orm/neon-http";
import { env } from "../env";

const connection: NeonQueryFunction<boolean, boolean> = neon(env.DATABASE_URL);

export const db = drizzle(connection);
