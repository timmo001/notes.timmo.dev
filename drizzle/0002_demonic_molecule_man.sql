CREATE TABLE IF NOT EXISTS "notes"."page" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"content" varchar,
	"dashboard_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
DROP INDEX IF EXISTS "title_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "page_title_idx" ON "notes"."page" USING btree ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notebook_title_idx" ON "notes"."notebook" USING btree ("title");