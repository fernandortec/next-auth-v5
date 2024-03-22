import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: text("cuid")
		.$defaultFn(() => createId())
		.primaryKey(),
	name: text("name"),
	email: text("email").unique(),
	password: text("password"),
	emailVerified: timestamp("email_verified"),
	emailVerified2: timestamp("email_verified"),
});

