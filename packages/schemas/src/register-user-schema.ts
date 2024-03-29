import { z } from "zod";

export const registerUserSchema = z.object({
	email: z.string().email({ message: "Email is required" }),
	password: z.string().min(6, { message: "Minimum 6 characters required" }),
	name: z.string().min(1, {
		message: "Name is required",
	}),
});

export type RegisterUserSchema = z.infer<typeof registerUserSchema>;
