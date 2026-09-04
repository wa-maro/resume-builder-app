import { errorLogger, infoLogger } from "@shared/utils";
import { connectDatabase, disconnectDatabase } from "./connection.js";
import { resetPersonalInfo } from "./resets/personal-info.reset.js";

async function reset() {
  await connectDatabase();

  infoLogger.info("Reset started.");

  await resetPersonalInfo();

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
