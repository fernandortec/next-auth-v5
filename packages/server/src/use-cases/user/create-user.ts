import { db } from "@/db/connection";
import { users } from "@/db/schema/user";
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
