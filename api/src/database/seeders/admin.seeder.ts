import { errorLogger, infoLogger } from "@shared/utils";
import { doHash } from "@security/password";
import { UserModel } from "@users";
import { UserRole } from "@users/types";
import { admins } from "./data/users.js";

export async function seedAdmins() {
  if (admins.length === 0) {
    errorLogger.error("No admins found. Admin seeding skipped.");
    return;
  }

  const password = process.env["ADMIN_PASSWORD_SEED"];

  if (!password) {
    errorLogger.error("ADMIN_PASSWORD_SEED is not defined.");
    return;
  }

  const passwordHash = await doHash(password);

  const operations = admins.map((admin) => ({
    updateOne: {
      filter: {
        $or: [{ username: admin.username }, { email: admin.email }],
      },
      update: {
        $setOnInsert: {
          username: admin.username,
          email: admin.email,
          passwordHash,
          role: UserRole.ADMIN,
        },
      },
      upsert: true,
    },
  }));

  const result = await UserModel.bulkWrite(operations);

  infoLogger.info(
    `Admin seeding completed. Created ${result.upsertedCount} admins.`,
  );
}
