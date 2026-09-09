import { MessageModel } from "@messages";
import { infoLogger } from "@shared/utils";

export async function resetMessages() {
  const result = await MessageModel.deleteMany({});

  infoLogger.warn(
    `Message reset completed. Deleted ${result.deletedCount} messages.`,
  );
}
