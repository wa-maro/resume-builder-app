import UserModel from "../../modules/users/user.model.js";
import { doHash } from "../../security/password/password.service.js";
import { infoLogger } from "../../shared/utils/loggers.util.js";
import users from "./data/users.js";

export async function seedUsers() {
  for (const user of users) {
    const existingUser = await UserModel.exists({
      $or: [{ username: user.username }, { email: user.email }],
    });

    if (existingUser) {
      continue;
    }

    const passwordHash = await doHash(user.password);

    await UserModel.create({
      username: user.username,
      email: user.email,
      passwordHash,
      role: user.role,
    });
  }

  infoLogger.info("User seeded.");
}
