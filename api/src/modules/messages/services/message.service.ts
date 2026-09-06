import { NotFoundError } from "@shared/errors";
import {
  CreateMessageInput,
  MessageMinimalResponseDto,
  MessageResponseDto,
} from "@messages/types";
import {
  createForUser,
  deactivateById,
  findById,
  replyById,
} from "../message.repository.js";
import { sendEmail } from "@shared/utils";

export async function createMessageForUser(data: CreateMessageInput) {
  const message = await createForUser(data);

  return new MessageMinimalResponseDto(message._id.toString(), message.name);
}

export const getMessageById = async (id: string) => {
  const message = await findById(id);

  if (!message) {
    throw new NotFoundError("message not found");
  }

  return new MessageResponseDto(message);
};

export async function replyMessageForAdmin(id: string, reply: string) {
  const message = await replyById(id, reply);

  if (!message) {
    throw new NotFoundError("Message not found");
  }

  await sendEmail({
    to: message.email,
    subject: "Reply to your message",
    text: message.reply,
    html: `<p>Hello ${message.name},</p><p>${message.reply}</p><br><p>Best regards,<br>Admin Team</p>`,
  });

  return new MessageResponseDto(message);
}

export async function deactivateMessageById(id: string) {
  const message = await deactivateById(id);

  if (!message) {
    throw new NotFoundError("Message not found");
  }

  return new MessageMinimalResponseDto(message._id.toString(), message.name);
}
