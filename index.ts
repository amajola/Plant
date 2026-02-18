import { drizzle } from "drizzle-orm/neon-http";
import { seedDatabase } from "./src/db/seed";
import { reset } from "drizzle-seed";
import { locationSchema } from "./src/db/schema/location.schema";
import { plantSchema } from "./src/db/schema/plant.schema";

// Interface Merged the .env file
declare module "bun" {
  interface Env {
    DATABASE_URL: string;
  }
}

async function main() {
  const db = drizzle(process.env.DATABASE_URL);
  await reset(db, { plantSchema, locationSchema });
  await seedDatabase(db).catch(console.error);
}

main();
