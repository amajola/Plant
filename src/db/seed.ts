import { type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { seed } from "drizzle-seed";
import { locationSchema as location } from "./schema/location.schema";
import { plantSchema as plant } from "./schema/plant.schema";

export async function seedDatabase(db: NeonHttpDatabase) {
  const existingLocations = await db.select().from(location).limit(1);
  const existingPlants = await db.select().from(plant).limit(1);

  if (existingLocations.length > 0 && existingPlants.length > 0) {
    console.log("Data already seeded. Skipping.");
    return;
  }

  console.log("Seeding data...");
  await seed(db, { location, plant }).refine((functions) => ({
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
        window_proximity: functions.int({ maxValue: 100, minValue: 0 }),
        notes: functions.loremIpsum({ sentencesCount: 1 }),
        light_value: functions.valuesFromArray({
          values: [...location.light_value.enumValues],
        }),
      },
    },
    plant: {
      count: 20,
      columns: {
        name: functions.valuesFromArray({
          values: [
            "Monstera",
            "Fiddle Leaf Fig",
            "Snake Plant",
            "Pothos",
            "Peace Lily",
            "Spider Plant",
            "ZZ Plant",
            "Rubber Plant",
            "Aloe Vera",
            "Bird of Paradise",
            "Philodendron",
            "Calathea",
            "Boston Fern",
            "Jade Plant",
            "String of Pearls",
            "Chinese Evergreen",
            "Dracaena",
            "Croton",
            "Orchid",
            "Succulent Mix",
          ],
        }),
        species: functions.valuesFromArray({
          values: [
            "Monstera deliciosa",
            "Ficus lyrata",
            "Sansevieria trifasciata",
            "Epipremnum aureum",
            "Spathiphyllum wallisii",
            "Chlorophytum comosum",
            "Zamioculcas zamiifolia",
            "Ficus elastica",
            "Aloe barbadensis",
            "Strelitzia reginae",
            "Philodendron hederaceum",
            "Calathea orbifolia",
            "Nephrolepis exaltata",
            "Crassula ovata",
            "Senecio rowleyanus",
            "Aglaonema commutatum",
            "Dracaena marginata",
            "Codiaeum variegatum",
            "Phalaenopsis amabilis",
            "Echeveria elegans",
          ],
        }),
        hero_photo_url: functions.valuesFromArray({
          values: [
            "https://images.unsplash.com/photo-1614594975525-e45190c55d0b",
            "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a",
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
            "https://images.unsplash.com/photo-1509423350716-97f9360b4e09",
            "https://images.unsplash.com/photo-1463936575829-25148e1db1b8",
            "https://images.unsplash.com/photo-1501004318855-cd2e3303afa3",
            "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
            "https://images.unsplash.com/photo-1604762524889-3e2fcc145683",
            "https://images.unsplash.com/photo-1470058869958-2a77cb20b204",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          ],
        }),
        bio: functions.loremIpsum({ sentencesCount: 1 }),
        status: functions.valuesFromArray({
          values: [...plant.status.enumValues],
        }),
        pot_size: functions.int({ minValue: 4, maxValue: 30 }),
        height: functions.int({ minValue: 5, maxValue: 200 }),
        spread: functions.int({ minValue: 5, maxValue: 100 }),
        pot_type: functions.valuesFromArray({
          values: [...plant.pot_type.enumValues],
        }),
        soil_type: functions.valuesFromArray({
          values: [...plant.soil_type.enumValues],
        }),
      },
    },
  }));
  console.log("Seeding complete.");
}
