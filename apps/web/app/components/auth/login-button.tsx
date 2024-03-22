"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface LoginButtonProps {
	children: ReactNode;
	mode?: "modal" | "redirect";
	asChild?: boolean;
}

export const LoginButton = ({
	children,
	asChild,
	mode = "redirect",
}: LoginButtonProps) => {
	const router = useRouter();
	const handleLogin = () => {
		router.push("/auth/login");
	};

	if (mode === "modal") {
		return <span>TO-DO implement modal</span>;
	}

	return (
		<span onClick={handleLogin} className="cursor-pointer">
			{children}
		</span>
	);
};
