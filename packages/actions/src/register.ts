"use server";

import { hash } from "bcrypt-ts";

import { createUser } from "@/use-cases";
import { getUserByEmail } from "@/use-cases/user/get-user";
import { type RegisterUserSchema, registerUserSchema } from "@repo/schemas";

export const registerUser = async (values: RegisterUserSchema) => {
	const validatedFields = registerUserSchema.safeParse(values);
	if (!validatedFields.success) return { error: "Invalid fields" };

	const { email, name, password } = validatedFields.data;
	const hashedPassword = await hash(password, 8);

	const existingUser = await getUserByEmail(email);
	if (existingUser) return { error: "Email already in use" };

	await createUser({ email, name, password: hashedPassword });

	//TODO Send verification email

	return { success: "User created" };
};
