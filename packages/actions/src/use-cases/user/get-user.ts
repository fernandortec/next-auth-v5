import { db, users } from "@repo/drizzle";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
	const [user] = await db.select().from(users).where(eq(users.email, email));
	return user;
}

export async function getUserById(id: string) {
	const [user] = await db.select().from(users).where(eq(users.id, id));
	return user;
}
