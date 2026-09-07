import { MessageModel } from "@messages";
import { errorLogger, infoLogger } from "@shared/utils";
import messages from "./data/messages.js";

export async function seedMessages() {
  if (messages.length === 0) {
    errorLogger.error("No messages found. Message seeding skipped.");
    return;
  }

  const result = await MessageModel.insertMany(messages);

  infoLogger.info(
    `Message seeding completed. Created ${result.length} messages.`,
  );
}
