"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
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

import { useMutation } from "@tanstack/react-query";
import { useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

import { type LoginSchema, loginSchema } from "../../../schemas/login-schema";
import { loginUser } from "../../../server/actions/login";

export const LoginForm = () => {
	const [isPending, startTransition] = useTransition();

	const form = useForm<LoginSchema>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "" },
	});

	const { data: loginData, mutate: execLogin } = useMutation({
		mutationFn: loginUser,
	});

	const handleLogin: SubmitHandler<LoginSchema> = (data, e) => {
		startTransition(() => {
			const { email, password } = data;
			execLogin({ email, password });
		});
	};

	return (
		<CardWrapper
			headerLabel="Welcome back"
			backButton={{ href: "/auth/register", label: "Dont have an account?" }}
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(handleLogin)}>
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
						<FormError message={loginData?.error} />
						<FormSuccess message={loginData?.success} />
						<Button type="submit" className="w-full" disabled={isPending}>
							Login
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	);
};
