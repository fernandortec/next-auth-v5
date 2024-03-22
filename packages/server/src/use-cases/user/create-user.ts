import { eq } from "drizzle-orm";
import type { RegisterUserSchema } from "../../../schemas/register-user-schema";
import { db } from "../../db/connection";
import { users } from "../../db/schema/user";

export async function createUser({
	email,
	name,
	password,
}: RegisterUserSchema) {
	const [user] = await db.insert(users).values({ email, name, password });

	// await db.insert(users).values({email,emailVerified,emailVerified2,id,name,password})

	return user;
}
