"use server";

import { hash } from "bcryptjs";

import {
	type RegisterUserSchema,
	registerUserSchema,
} from "../../schemas/register-user-schema";
import { createUser } from "../use-cases/user/create-user";
import { getUserByEmail } from "../use-cases/user/get-user";

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
