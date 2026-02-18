import {
  date,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";

export const locationSchema = pgTable("location", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  indoor_outdoor: varchar({ enum: ["indoor", "outdoor"] }).notNull(),
  name: varchar({ length: 160 }),
  light_direction: varchar({
    enum: [
      "north",
      "northeast",
      "east",
      "southeast",
      "south",
      "southwest",
      "west",
      "northwest",
    ],
  }).notNull(),
  light_type: text({ enum: ["natural", "artificial", "mixed"] }).notNull(),
  window_proximity: integer().notNull(),
  notes: varchar({ length: 255 }),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  light_value: varchar({
    enum: ["shade", "partial_shade", "bright_indirect", "bright_direct"],
  }).notNull(),
});

export type Location = InferSelectModel<typeof locationSchema>;
export type NewLocation = InferInsertModel<typeof locationSchema>;
