import { MessageDocument } from "@messages";
import { Message } from "@messages/types";

export type CreateMessageInput = Pick<Message, "name" | "email" | "message">;

export type ReplyMessageInput = Pick<Message, "reply" | "isReplied">;

export class MessageMinimalResponseDto {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class MessageResponseDto extends MessageMinimalResponseDto {
  email: string;
  message: string;
  reply: string;
  isReplied?: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(message: MessageDocument) {
    super(message._id.toString(), message.name);

    this.email = message.email;
    this.message = message.message;
    this.reply = message.reply;
    this.isReplied = message.isReplied;
    this.isActive = message.isActive;
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
  }
}
