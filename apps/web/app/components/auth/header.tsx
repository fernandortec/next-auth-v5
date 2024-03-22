interface HeaderProps {
	label: string;
}

export const Header = ({ label }: HeaderProps) => {
	return (
		<header className="w-full flex-col gap-y-4 items-center justify-center">
			<h1 className="text-3xl font-semibold font-poppins">🔐Auth</h1>
			<p className="text-muted-foreground text-sm">{label}</p>
		</header>
	);
};
