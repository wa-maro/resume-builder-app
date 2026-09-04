import { errorLogger, infoLogger } from "@shared/utils";
import { connectDatabase, disconnectDatabase } from "./connection.js";
import { resumeSeeder } from "./seeders/resume.seeder.js";
import { seedUsers } from "./seeders/user.seeder.js";

async function seed() {
  await connectDatabase();

  infoLogger.info("Seeding started.");

  await seedUsers();
  await resumeSeeder();

  infoLogger.info("Seeding completed.");
}

seed()
  .catch((error: unknown) => {
    errorLogger.error({
      message: "Seeding failed",
      error,
    });

    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
