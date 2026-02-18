import { defineRelations } from "drizzle-orm";
import { locationSchema } from "../location.schema";
import { plantSchema } from "../plant.schema";

export const locationPlantRelations = defineRelations(
  { locationSchema, plantSchema },
  (relation) => ({
    locationSchema: {
      plants: relation.many.plantSchema({
        to: relation.plantSchema.location_id,
        from: relation.locationSchema.id,
      }),
    },
    plantSchema: {
      location: relation.one.locationSchema({
        from: relation.plantSchema.location_id,
        to: relation.locationSchema.id,
      }),
    },
  }),
);
