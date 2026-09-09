import { NotFoundError } from "@shared/errors";
import {
  CreateMessageInput,
  MessageMinimalResponseDto,
  MessageQueryDto,
  MessageRepoQueryOptions,
  MessageResponseDto,
} from "@messages/types";
import { messageRepository } from "@messages";
import { sendEmail } from "@shared/utils";

async function createMessage(data: CreateMessageInput) {
  const message = await messageRepository.create(data);

  return new MessageMinimalResponseDto(message._id.toString(), message.name);
}

const findMessages = async (query: MessageQueryDto) => {
  const {
    filter = {},
    page = 1,
    limit = 10,
    sort = "createdAt",
    sortOrder = "desc",
  } = query;

  const skip = (page - 1) * limit;
  const order = sortOrder === "asc" ? 1 : -1;

  const repoQuery: MessageRepoQueryOptions = {
    filter,
    skip,
    limit,
    sort,
    order,
  };

  const [messages, total] = await Promise.all([
    messageRepository.findAll(repoQuery),
    messageRepository.getCount(filter),
  ]);

  return {
    data: messages.map((message) => new MessageResponseDto(message)),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: skip + messages.length < total,
      hasPreviousPage: skip > 0,
    },
  };
};

async function findMessageById(id: string) {
  const message = await messageRepository.findById(id);

  if (!message) {
    throw new NotFoundError("message not found");
  }

  return new MessageResponseDto(message);
}

async function replyMessage(id: string, reply: string) {
  const message = await messageRepository.replyById(id, reply);

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

async function deactivateMessageById(id: string) {
  const message = await messageRepository.deactivateById(id);

  if (!message) {
    throw new NotFoundError("Message not found");
  }

  return new MessageMinimalResponseDto(message._id.toString(), message.name);
}

export const messageService = { createMessage };

export const messageAdminService = {
  findMessages,
  findMessageById,
  replyMessage,
  deactivateMessageById,
};
