import { BadRequestError } from "@shared/errors";
import { CreateMessageInput, MessageMinimalResponseDto } from "@messages/types";
import { createForUser } from "../message.repository.js";

export async function createMessageForUser(data: CreateMessageInput) {
  const message = await createForUser(data);
  if (!message) throw new BadRequestError("Failed to save message");

  return new MessageMinimalResponseDto(message._id.toString(), message.name);
}
