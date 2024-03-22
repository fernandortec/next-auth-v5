"use client";

import { Button } from "@/components/ui/button";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Icons } from "../../../public/icons";

export const Social = () => {
	return (
		<div className="flex items-center w-full gap-x-2">
			<Button size="lg" className="w-full" variant="outline">
				<Icons.Google className="h-5 w-5" />
			</Button>
			<Button size="lg" className="w-full" variant="outline">
				<GitHubLogoIcon className="h-5 w-5" />
			</Button>
		</div>
	);
};
