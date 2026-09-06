import { BadRequestError, NotFoundError } from "@shared/errors";
import {
  CreateMessageInput,
  MessageMinimalResponseDto,
  MessageResponseDto,
} from "@messages/types";
import { createForUser, findById } from "../message.repository.js";

export async function createMessageForUser(data: CreateMessageInput) {
  const message = await createForUser(data);
  if (!message) throw new BadRequestError("Failed to save message");

  return new MessageMinimalResponseDto(message._id.toString(), message.name);
}

export const getMessageById = async (id: string) => {
  const message = await findById(id);

  if (!message) {
    throw new NotFoundError("message not found");
  }

  return new MessageResponseDto(message);
};
