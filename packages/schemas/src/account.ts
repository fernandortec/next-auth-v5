export type ProviderType =
	| "oidc"
	| "oauth"
	| "email"
	| "credentials"
	| "webauthn";

export type WebAuthnProviderType = "webauthn";

export type AdapterAccountType = Extract<
	ProviderType,
	"oauth" | "oidc" | "email" | "webauthn"
>;
