import { errorLogger, infoLogger } from "@shared/utils";
import { connectDatabase, disconnectDatabase } from "./connection.js";
import { seedResumes } from "./seeders/resume.seeder.js";
import { seedUsers } from "./seeders/user.seeder.js";
import { seedAdmins } from "./seeders/admin.seeder.js";

async function seed() {
  await connectDatabase();

  infoLogger.info("Seeding started.");

  await seedAdmins();
  await seedUsers();
  await seedResumes();

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
