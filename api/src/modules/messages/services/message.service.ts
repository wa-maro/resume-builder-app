import { CreateMessageInput, MessageMinimalResponseDto } from "@messages/types";
import { messageRepository } from "@messages";

async function createMessage(data: CreateMessageInput) {
  const message = await messageRepository.create(data);

  return new MessageMinimalResponseDto(message._id.toString(), message.name);
}

export const messageService = { createMessage };
