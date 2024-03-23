import { loginSchema } from "@repo/schemas";
import { getUserByEmail } from "@repo/server";

import { compare } from "bcrypt-ts";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	providers: [
		Credentials({
			async authorize(credentials) {
				const validatedFields = loginSchema.safeParse(credentials);
				if (!validatedFields.success)
					throw new Error("Login schema does not match credentials");

				const { email, password } = validatedFields.data;

				const user = await getUserByEmail(email);
				if (!user || !user.password) return null;

				const passwordsMatch = await compare(password, user.password);
				if (passwordsMatch) return user;

				return null;
			},
		}),
	],
});
