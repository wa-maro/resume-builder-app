import { errorLogger, infoLogger } from "@shared/utils";
import { doHash } from "@security/password";
import { UserModel } from "@users";
import users from "./data/users.js";

export async function seedUsers() {
  if (users.length === 0) {
    errorLogger.error("No users found. User seeding skipped.");
    return;
  }

  const operations = await Promise.all(
    users.map(async (user) => {
      const passwordHash = await doHash(user.password);

      return {
        updateOne: {
          filter: {
            $or: [{ username: user.username }, { email: user.email }],
          },
          update: {
            $setOnInsert: {
              username: user.username,
              email: user.email,
              passwordHash,
              role: user.role,
            },
          },
          upsert: true,
        },
      };
    }),
  );

  const result = await UserModel.bulkWrite(operations);

  infoLogger.info(
    `User seeding completed. Created ${result.upsertedCount} users.`,
  );
}
