import {
  CreateMessageInput,
  MessageFilter,
  MessageRepoQueryOptions,
} from "@messages/types";
import { MessageModel } from "@messages";

async function create(data: CreateMessageInput) {
  return MessageModel.create(data);
}

async function findAll(query: MessageRepoQueryOptions) {
  const {
    filter = {},
    skip = 0,
    limit = 10,
    sort = "createdAt",
    order = -1,
  } = query;

  const mongoFilter = buildMessageMongoFilter(filter);

  return MessageModel.find(mongoFilter)
    .sort({
      [sort]: order,
      _id: -1,
    })
    .skip(skip)
    .limit(limit)
    .exec();
}

async function getCount(filter: MessageFilter) {
  const mongoFilter = buildMessageMongoFilter(filter);

  return MessageModel.countDocuments(mongoFilter).exec();
}

async function findById(id: string) {
  return MessageModel.findById(id);
}

async function replyById(id: string, reply: string) {
  return MessageModel.findByIdAndUpdate(
    { _id: id, isActive: true },
    { reply, isReplied: true },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
}

async function deactivateById(id: string) {
  return MessageModel.findByIdAndUpdate(
    id,
    { isActive: false },
    {
      returnDocument: "after",
      runValidators: true,
    },
  );
}

function buildMessageMongoFilter(filter: MessageFilter) {
  const { search, ...rest } = filter;

  if (!search) {
    return rest;
  }

  return {
    ...rest,
    $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } },
      { reply: { $regex: search, $options: "i" } },
    ],
  };
}

export const messageRepository = {
  create,
  findAll,
  getCount,
  findById,
  replyById,
  deactivateById,
};
