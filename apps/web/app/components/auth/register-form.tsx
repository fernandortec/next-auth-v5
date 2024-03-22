"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useMutation } from "@tanstack/react-query";
import { useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
	type RegisterUserSchema,
	registerUserSchema,
} from "../../../schemas/register-user-schema";
import { registerUser } from "../../../server/actions/register";

export const RegisterForm = () => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<RegisterUserSchema>({
		resolver: zodResolver(registerUserSchema),
		defaultValues: { email: "", password: "", name: "" },
	});

	const { data: loginData, mutate: execRegisterUser } = useMutation({
		mutationFn: registerUser,
	});

	const handleRegister: SubmitHandler<RegisterUserSchema> = (data, e) => {
		startTransition(() => {
			const { email, name, password } = data;
			execRegisterUser({ email, name, password });
		});
	};

	return (
		<CardWrapper
			headerLabel="Create an account"
			backButton={{ href: "/auth/login", label: "Already have an account?" }}
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleRegister)}>
					<div className="space-y-4">
						<FormField
							name="email"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="john.doe@example.com"
											type="email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="********"
											type="password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={isPending}
											placeholder="John Doe"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormError message={loginData?.error} />
						<FormSuccess message={loginData?.success} />
						<Button type="submit" className="w-full" disabled={isPending}>
							Register
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	);
};
