CREATE TABLE IF NOT EXISTS "account" (
	"cuid" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"scope" text,
	"id_token" text,
	"provider" text NOT NULL,
	"token_type" text,
	"expires_at" integer,
	"refresh_token" text,
	"access_token" text,
	"session_state" text,
	"providerAccountId" text NOT NULL,
	"userId" text NOT NULL,
	CONSTRAINT "account_provider_unique" UNIQUE("provider"),
	CONSTRAINT "account_providerAccountId_unique" UNIQUE("providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"cuid" text PRIMARY KEY NOT NULL,
	"name" text,
	"email" text,
	"password" text,
	"email_verified" timestamp,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_users_cuid_fk" FOREIGN KEY ("userId") REFERENCES "users"("cuid") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
