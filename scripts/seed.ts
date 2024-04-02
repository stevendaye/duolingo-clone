import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding Database...");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 2,
        title: "Italian",
        imageSrc: "/it.svg",
      },
      {
        id: 3,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 4,
        title: "Croatian",
        imageSrc: "/hr.svg",
      },
      {
        id: 5,
        title: "Japanese",
        imageSrc: "/jp.svg",
      },
      {
        id: 6,
        title: "German",
        imageSrc: "/de.svg",
      },
      {
        id: 7,
        title: "Korean",
        imageSrc: "/kr.svg",
      },
      {
        id: 8,
        title: "Chinese",
        imageSrc: "/cn.svg",
      },
      {
        id: 9,
        title: "Russian",
        imageSrc: "/ru.svg",
      },
      {
        id: 10,
        title: "Portuguese",
        imageSrc: "/pt.svg",
      },
      {
        id: 11,
        title: "Swedish",
        imageSrc: "/se.svg",
      },
      {
        id: 12,
        title: "English",
        imageSrc: "/uk.svg",
      },
    ]);

    console.log("Seeding Completed");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to  find the database");
  }
};
main();
