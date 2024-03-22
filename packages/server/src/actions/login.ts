"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { type LoginSchema, loginSchema } from "../../schemas/login-schema";

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
	} catch (error: any) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid credentials!" };
				default:
					return { error: "Somwthing went wrong" };
			}
		}

		throw error;
	}

	return { success: "Email sent" };
};
