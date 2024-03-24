import { createId } from "@paralleldrive/cuid2";
import type { AdapterAccountType } from "@repo/schemas";
import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const accounts = pgTable("account", {
	id: text("cuid")
		.$defaultFn(() => createId())
		.primaryKey(),

	type: text("type").$type<AdapterAccountType>().notNull(),
	scope: text("scope"),
	id_token: text("id_token"),
	provider: text("provider").notNull().unique(),
	token_type: text("token_type"),
	expires_at: integer("expires_at"),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	session_state: text("session_state"),
	providerAccountId: text("providerAccountId").notNull().unique(),

	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});
