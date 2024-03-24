"use server";

import { signIn } from "@/auth";
import {
	DEFAULT_LOGIN_REDIRECT,
	type LoginSchema,
	loginSchema,
} from "@repo/schemas";
import { AuthError } from "next-auth";

export const loginUser = async (values: LoginSchema) => {
	const validatedFields = loginSchema.safeParse(values);
	if (!validatedFields.success) return { error: "Invalid fields" };

	const { email, password } = validatedFields.data;

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error: unknown) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid credentials!" };
				default:
					return { error: "Something went wrong" };
			}
		}

		throw error;
	}

	return { success: "Email sent" };
};
