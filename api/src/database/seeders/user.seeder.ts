import { errorLogger, infoLogger } from "@shared/utils";
import { doHash } from "@security/password";
import { UserModel } from "@users";
import { UserRole } from "@users/types";
import { users } from "./data/users.js";

export async function seedUsers() {
  if (users.length === 0) {
    errorLogger.error("No users found. User seeding skipped.");
    return;
  }

  const password = process.env["USER_PASSWORD_SEED"];

  if (!password) {
    errorLogger.error("USER_PASSWORD_SEED is not defined.");
    return;
  }

  const passwordHash = await doHash(password);

  const operations = users.map((user) => ({
    updateOne: {
      filter: {
        $or: [{ username: user.username }, { email: user.email }],
      },
      update: {
        $setOnInsert: {
          username: user.username,
          email: user.email,
          passwordHash,
          role: UserRole.USER,
        },
      },
      upsert: true,
    },
  }));

  const result = await UserModel.bulkWrite(operations);

  infoLogger.info(
    `User seeding completed. Created ${result.upsertedCount} users.`,
  );
}
