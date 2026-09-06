import { CreateMessageInput } from "@messages/types";
import { MessageModel } from "./message.model.js";

export async function createForUser(data: CreateMessageInput) {
  return MessageModel.create(data);
}

export async function findById(id: string) {
  return MessageModel.findById(id);
}

export async function replyById(id: string, reply: string) {
  return MessageModel.findByIdAndUpdate(
    { _id: id, isActive: true },
    { reply, isReplied: true },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
}

export async function deactivateById(id: string) {
  return MessageModel.findByIdAndUpdate(
    id,
    { isActive: false },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
}
