CREATE TABLE "location" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "location_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"indoor_outdoor" varchar NOT NULL,
	"name" varchar(160),
	"light_direction" varchar NOT NULL,
	"light_type" text NOT NULL,
	"window_proximity" integer NOT NULL,
	"notes" varchar(255),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"light_value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "plant" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "plant_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(160) NOT NULL,
	"species" varchar(160) NOT NULL,
	"bio" varchar(255),
	"date_acquired" date DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"deleted_at" date,
	"updated_at" timestamp DEFAULT now(),
	"status" varchar NOT NULL,
	"hero_photo_url" text,
	"pot_size" integer,
	"height" integer,
	"spread" integer,
	"last_repotted" date,
	"location_id" integer,
	"pot_type" text,
	"soil_type" varchar
);
--> statement-breakpoint
ALTER TABLE "plant" ADD CONSTRAINT "plant_location_id_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL;