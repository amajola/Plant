import {
  date,
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { locationSchema } from "./location.schema";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const plantSchema = pgTable("plant", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 160 }).notNull(),
  species: varchar({ length: 160 }).notNull(),
  bio: varchar({ length: 255 }),
  date_acquired: date().defaultNow(),
  created_at: timestamp().defaultNow(),
  deleted_at: timestamp(),
  updated_at: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
  status: varchar({
    enum: [
      "healthy",
      "thriving",
      "struggling",
      "recovering",
      "declining",
      "dead",
    ],
  }).notNull(),
  hero_photo_url: text(),
  pot_size: integer(),
  height: integer(),
  spread: integer(),
  last_repotted: date(),
  location_id: integer("location_id").references(() => locationSchema.id, {
    onDelete: "set null",
  }),
  pot_type: text({
    enum: [
      "terracotta",
      "ceramic",
      "plastic",
      "fabric",
      "hanging",
      "self_watering",
      "glass",
      "wood",
      "metal",
      "concrete",
      "other",
    ],
  }),
  soil_type: varchar({
    enum: [
      "potting_mix",
      "cactus_succulent",
      "orchid_mix",
      "peat_based",
      "coconut_coir",
      "water",
      "hydroponic",
      "custom",
    ],
  }),
});

export type Plant = InferSelectModel<typeof plantSchema>;
export type NewPlant = InferInsertModel<typeof plantSchema>;
