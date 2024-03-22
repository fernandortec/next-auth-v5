"use client";

import { BackButton } from "@/components/auth/back-button";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { ReactNode } from "react";

interface CardWrapperProps {
	children: ReactNode;
	headerLabel: string;
	backButton: {
		label: string;
		href: string;
	};
	showSocial?: boolean;
}

export const CardWrapper = ({
	backButton,
	children,
	headerLabel,
	showSocial,
}: CardWrapperProps) => {
	return (
		<Card className="w-[25rem] shadow-md">
			<CardHeader>
				<Header label={headerLabel} />
			</CardHeader>
			<CardContent>{children}</CardContent>
			{showSocial && (
				<CardFooter>
					<Social />
				</CardFooter>
			)}
			<CardFooter>
				<BackButton label={backButton.label} href={backButton.href} />
			</CardFooter>
		</Card>
	);
};
