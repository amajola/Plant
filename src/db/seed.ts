import { type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { seed } from "drizzle-seed";
import { locationSchema as location } from "./schema/location.schema";
import { plantSchema as plant } from "./schema/plant.schema";
import type { NewPlant } from "./schema/plant.schema";

const PLANTS = [
  { name: "Monstera", species: "Monstera deliciosa", bio: "A tropical icon known for its dramatic split leaves, perfect for bright indirect light and making a bold statement in any room." },
  { name: "Fiddle Leaf Fig", species: "Ficus lyrata", bio: "A striking tree with large, violin-shaped leaves that thrives in bright, stable conditions and adds architectural elegance to interiors." },
  { name: "Snake Plant", species: "Sansevieria trifasciata", bio: "One of the hardiest houseplants around, tolerating low light and infrequent watering while purifying the air with minimal fuss." },
  { name: "Pothos", species: "Epipremnum aureum", bio: "A fast-growing trailing vine that adapts to almost any light condition, making it an ideal beginner plant for shelves and hanging baskets." },
  { name: "Peace Lily", species: "Spathiphyllum wallisii", bio: "A graceful flowering plant that thrives in low light and signals when it needs water by gently drooping its leaves." },
  { name: "Spider Plant", species: "Chlorophytum comosum", bio: "A cheerful, adaptable plant that produces cascading baby plantlets and is practically impossible to kill, even in neglect." },
  { name: "ZZ Plant", species: "Zamioculcas zamiifolia", bio: "With its glossy, waxy leaves and extreme drought tolerance, the ZZ plant is the ultimate low-maintenance houseplant for dark corners." },
  { name: "Rubber Plant", species: "Ficus elastica", bio: "A bold, fast-growing plant with deep burgundy or green leaves that commands attention and adapts well to indoor conditions." },
  { name: "Aloe Vera", species: "Aloe barbadensis", bio: "A succulent with thick, fleshy leaves filled with soothing gel, equally valuable as a natural remedy and a handsome windowsill plant." },
  { name: "Bird of Paradise", species: "Strelitzia reginae", bio: "A tropical showstopper with enormous paddle-shaped leaves that conjures a lush, resort-like atmosphere in bright, sunny spaces." },
  { name: "Philodendron", species: "Philodendron hederaceum", bio: "A velvety, heart-shaped climber that grows quickly in moderate light and is forgiving enough for beginners yet satisfying for enthusiasts." },
  { name: "Calathea", species: "Calathea orbifolia", bio: "Prized for its striking silver-striped leaves that fold upward at night, this humidity-loving beauty rewards attentive care with breathtaking foliage." },
  { name: "Boston Fern", species: "Nephrolepis exaltata", bio: "A lush, arching fern that thrives in humidity and indirect light, bringing a soft, feathery texture to bathrooms and bright hallways." },
  { name: "Jade Plant", species: "Crassula ovata", bio: "A long-lived succulent with thick, oval leaves that can grow into a miniature tree over decades, traditionally regarded as a symbol of good luck." },
  { name: "String of Pearls", species: "Senecio rowleyanus", bio: "A captivating succulent with bead-like leaves that cascade elegantly from hanging pots, preferring bright light and very infrequent watering." },
  { name: "Chinese Evergreen", species: "Aglaonema commutatum", bio: "A highly adaptable foliage plant available in a spectrum of green, silver, and red patterns, and one of the most tolerant plants for low-light interiors." },
  { name: "Dracaena", species: "Dracaena marginata", bio: "A dramatic, architectural plant with slender, red-edged leaves atop bare canes, bringing a sculptural quality to bright or moderately lit rooms." },
  { name: "Croton", species: "Codiaeum variegatum", bio: "An explosion of colour with bold, leathery leaves in shades of red, orange, yellow, and green, thriving in bright light and warm temperatures." },
  { name: "Orchid", species: "Phalaenopsis amabilis", bio: "The most popular orchid in the world, producing elegant arching sprays of blooms that last for months with indirect light and weekly watering." },
  { name: "Succulent Mix", species: "Echeveria elegans", bio: "A rosette-forming succulent with pale blue-green leaves and a compact, symmetrical form that looks equally at home on a desk or in a sunny windowsill." },
  { name: "Cast Iron Plant", species: "Aspidistra elatior", bio: "True to its name, this virtually indestructible plant tolerates deep shade, temperature swings, and neglect with remarkable stoicism." },
  { name: "Ponytail Palm", species: "Beaucarnea recurvata", bio: "Not a true palm, this slow-growing novelty stores water in its swollen trunk and sports a fountain of long, slender leaves that curl at the tips." },
  { name: "Anthurium", species: "Anthurium andraeanum", bio: "Known for its waxy, heart-shaped spathes in vivid red or pink, this tropical gem blooms almost year-round in bright, humid conditions." },
  { name: "Prayer Plant", species: "Maranta leuconeura", bio: "Named for its nightly leaf-folding habit that resembles hands in prayer, this low-growing plant displays intricate patterns of green, red, and cream." },
  { name: "African Violet", species: "Streptocarpus sect. Saintpaulia", bio: "A compact flowering favourite that blooms prolifically under bright indirect light, producing clusters of velvety purple, pink, or white flowers year-round." },
  { name: "Pothos Neon", species: "Epipremnum aureum 'Neon'", bio: "A vivid chartreuse variety of the classic pothos, its electrically bright leaves trail beautifully and light up shaded corners with minimal care." },
  { name: "Swiss Cheese Plant", species: "Monstera adansonii", bio: "A more delicate cousin of the Monstera deliciosa, with smaller, heavily fenestrated leaves that look stunning trailing from a shelf or climbing a pole." },
  { name: "Nerve Plant", species: "Fittonia albivenis", bio: "A striking miniature plant with deeply veined leaves in contrasting white, pink, or red, ideal for terrariums and humid, low-light settings." },
  { name: "Heartleaf Philodendron", species: "Philodendron cordatum", bio: "A vigorous, easy-going climber with glossy heart-shaped leaves that tolerates a wide range of conditions and grows quickly with little attention." },
  { name: "Parlor Palm", species: "Chamaedorea elegans", bio: "A refined, slow-growing palm that has graced Victorian parlours for centuries, tolerating low light and dry air better than almost any other palm." },
  { name: "Umbrella Plant", species: "Schefflera arboricola", bio: "A versatile, fast-growing shrub with distinctive whorls of glossy leaflets that can be trained as a tree or kept compact with regular pruning." },
  { name: "Pilea", species: "Pilea peperomioides", bio: "Affectionately known as the Chinese money plant, this quirky species produces circular, pancake-like leaves on long petioles and is easy to propagate." },
  { name: "English Ivy", species: "Hedera helix", bio: "A classic trailing and climbing plant with lobed leaves that drapes beautifully from hanging baskets and tolerates cooler, shadier indoor conditions." },
  { name: "Tradescantia", species: "Tradescantia zebrina", bio: "A fast-growing trailing plant with iridescent silver and purple striped leaves that is nearly impossible to kill and easy to propagate from cuttings." },
  { name: "Hoya", species: "Hoya carnosa", bio: "A slow-growing, long-lived wax plant that rewards patience with clusters of star-shaped, sweetly fragrant flowers and requires very little water." },
  { name: "Oxalis", species: "Oxalis triangularis", bio: "A charming bulbous plant with deep purple, shamrock-shaped leaves that open in light and fold at dusk, occasionally producing delicate pink flowers." },
  { name: "Ctenanthe", species: "Ctenanthe burle-marxii", bio: "A close relative of the Calathea with herringbone-patterned leaves in green and silver, valued for its striking foliage and prayer-plant movement." },
  { name: "Alocasia", species: "Alocasia amazonica", bio: "A dramatic tropical with dark, arrow-shaped leaves edged in white veins, requiring bright indirect light, humidity, and consistently moist soil." },
  { name: "Haworthia", species: "Haworthiopsis attenuata", bio: "A small, slow-growing succulent with white-banded, fleshy leaves arranged in a tidy rosette, well-suited to low light and minimal watering." },
  { name: "Bunny Ears Cactus", species: "Opuntia microdasys", bio: "A charming cactus with flat, oval pads covered in soft-looking tufts of tiny spines, thriving in full sun and very dry conditions." },
];

export async function seedDatabase(db: NeonHttpDatabase) {
  const existingLocations = await db.select().from(location).limit(1);
  const existingPlants = await db.select().from(plant).limit(1);

  if (existingLocations.length > 0) {
    console.log("Locations already seeded. Skipping.");
  } else {
    console.log("Seeding locations...");
    await seed(db, { location }).refine((functions) => ({
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
    }));
  }

  if (existingPlants.length > 0) {
    console.log("Plants already seeded. Skipping.");
    return;
  }

  const seededLocations = await db
    .select({ id: location.id })
    .from(location);
  const locationIds = seededLocations.map((l) => l.id);

  const statuses = plant.status.enumValues;
  const potTypes = plant.pot_type.enumValues;
  const soilTypes = plant.soil_type.enumValues;
  const photoUrls = [
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
  ];

  const pick = <T>(arr: readonly T[]) =>
    arr[Math.floor(Math.random() * arr.length)];
  const randInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  console.log("Seeding plants...");
  const rows: NewPlant[] = PLANTS.map((p) => ({
    name: p.name,
    species: p.species,
    bio: p.bio,
    status: pick(statuses)!,
    pot_size: randInt(4, 30),
    height: randInt(5, 200),
    spread: randInt(5, 100),
    pot_type: pick(potTypes),
    soil_type: pick(soilTypes),
    hero_photo_url: pick(photoUrls),
    location_id: pick(locationIds),
  }));

  await db.insert(plant).values(rows);
  console.log("Seeding complete.");
}
