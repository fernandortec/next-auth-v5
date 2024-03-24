import { db, users } from "@repo/drizzle";
import type { RegisterUserSchema } from "@repo/schemas";

export async function createUser({
	email,
	name,
	password,
}: RegisterUserSchema) {
	const [user] = await db
		.insert(users)
		.values({ email, name, password })
		.returning();

	return user;
}
