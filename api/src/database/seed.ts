import { errorLogger, infoLogger } from "../shared/utils/loggers.util.js";
import { connectDatabase, disconnectDatabase } from "./connection.js";

async function seed() {
  await connectDatabase();

  infoLogger.info("Seeding started.");

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
