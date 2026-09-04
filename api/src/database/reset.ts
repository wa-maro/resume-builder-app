import { errorLogger, infoLogger } from "@shared/utils";
import { connectDatabase, disconnectDatabase } from "./connection.js";

async function reset() {
  await connectDatabase();

  infoLogger.info("Reset started.");

  infoLogger.info("Reset completed.");
}

reset()
  .catch((error: unknown) => {
    errorLogger.error({
      message: "Reset failed",
      error,
    });

    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
