import { db } from "@/db/connection";
import { users } from "@/db/schema/user";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
	const [user] = await db.select().from(users).where(eq(users.email, email));
	return user;
}

export async function getUserById(id: string) {
	const [user] = await db.select().from(users).where(eq(users.id, id));
	return user;
}
