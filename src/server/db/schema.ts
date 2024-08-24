// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  pgSchema,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mySchema = pgSchema("notes");

export const notebooks = mySchema.table(
  "notebook",
  {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 256 }),
    description: varchar("description", {}),
    userId: varchar("user_id", { length: 36 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  ({ title }) => ({
    titleIndex: index("title_idx").on(title),
  }),
);
