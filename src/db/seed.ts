import { type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { seed } from "drizzle-seed";
import { locationSchema as location } from "./schema/location.schema";

export async function seedDatabase(db: NeonHttpDatabase) {
  const existing = await db.select().from(location).limit(1);

  if (existing.length > 0) {
    console.log("Location data already seeded. Skipping.");
    return;
  }

  console.log("Seeding location data...");
  await seed(db, { location }, { count: 6 }).refine((functions) => ({
    location: {
      count: 10,
      columns: {
        indoor_outdoor: functions.valuesFromArray({
          values: [...location.indoor_outdoor.enumValues],
        }),
        light_direction: functions.valuesFromArray({
          values: [...location.light_direction.enumValues],
        }),
        light_type: functions.valuesFromArray({
          values: [...location.light_type.enumValues],
        }),
        window_proximity: functions.int({ maxValue: 100, minValue: 0.05 }),
        notes: functions.loremIpsum({ sentencesCount: 1 }),
        light_value: functions.valuesFromArray({
          values: [...location.light_value.enumValues],
        }),
      },
    },
  }));
  console.log("Seeding complete.");
}
