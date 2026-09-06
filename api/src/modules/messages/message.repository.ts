import { CreateMessageInput } from "@messages/types";
import { MessageModel } from "./message.model.js";

export async function createForUser(data: CreateMessageInput) {
  return MessageModel.create(data);
}
