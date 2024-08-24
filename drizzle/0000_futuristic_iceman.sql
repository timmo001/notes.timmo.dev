CREATE SCHEMA IF NOT EXISTS "notes";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notes"."notebook" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"description" varchar,
	"user_id" varchar(36),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "notes"."notebook" USING btree ("title");