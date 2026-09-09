import type { Request, Response } from "express";
import { messageAdminService } from "@messages/services";
import { BadRequestError } from "@shared/errors";
import {
  MessageQueryDto,
  MessageSortField,
  ReplyMessageInput,
} from "@messages/types";
import { SortOrderDto } from "@shared/types";

async function getMessages(req: Request, res: Response) {
  const { page, limit, sort, sortOrder, search, isActive, isReplied } =
    req.query;

  const query: MessageQueryDto = {
    filter: {},
  };

  if (page) query.page = Number(page);

  if (limit) query.limit = Number(limit);

  if (sort) query.sort = sort as MessageSortField;

  if (sortOrder) query.sortOrder = sortOrder as SortOrderDto;

  if (search) query.filter!.search = search as string;

  if (isActive) query.filter!.isActive = isActive === "true";

  if (isReplied) query.filter!.isReplied = isReplied === "true";

  return res.status(200).json({
    success: true,
    message: "Messages retrieved successfully",
    ...(await messageAdminService.findMessages(query)),
  });
}

async function getMessage(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Message retrieved successfully",
    data: await messageAdminService.findMessageById(id),
  });
}

async function replyMessage(req: Request, res: Response) {
  const { id } = req.params;
  const data: ReplyMessageInput = req.body;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  res.status(200).json({
    success: true,
    message: "Reply sent successfully",
    data: await messageAdminService.replyMessage(id, data.reply),
  });
}

async function deactivateMessage(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Message deactivated successfully",
    data: await messageAdminService.deactivateMessageById(id),
  });
}

export const messageAdminController = {
  getMessages,
  getMessage,
  replyMessage,
  deactivateMessage,
};
