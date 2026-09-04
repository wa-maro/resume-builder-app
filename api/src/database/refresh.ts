import { errorLogger, infoLogger } from "@shared/utils";
import { connectDatabase, disconnectDatabase } from "@database";
import { resetPersonalInfo } from "./resets/personal-info.reset.js";
import { resetResumes } from "./resets/resume.reset.js";
import { resetUsers } from "./resets/user.reset.js";
import { seedAdmins } from "./seeders/admin.seeder.js";
import { seedUsers } from "./seeders/user.seeder.js";
import { seedResumes } from "./seeders/resume.seeder.js";
import { seedPersonalInfos } from "./seeders/personal-info.seeder.js";

async function refresh() {
  await connectDatabase();

  infoLogger.info("Database refresh started.");

  await resetPersonalInfo();
  await resetResumes();
  await resetUsers();

  await seedAdmins();
  await seedUsers();
  await seedResumes();
  await seedPersonalInfos();

  infoLogger.info("Database refresh completed.");
}

refresh()
  .catch((error: unknown) => {
    errorLogger.error({
      message: "Database refresh failed",
      error,
    });

    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
