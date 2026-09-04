import { infoLogger } from "@shared/utils";
import { UserModel } from "@users";

export async function resetUsers() {
  const result = await UserModel.deleteMany({});

  infoLogger.info(
    `User reset completed. Deleted ${result.deletedCount} users.`,
  );
}
