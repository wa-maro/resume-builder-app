import type { Request, Response } from "express";
import {
  deactivateMessageById,
  getMessageById,
  replyMessageForAdmin,
} from "@messages/services";
import { BadRequestError } from "@shared/errors";
import { ReplyMessageInput } from "@messages/types";

export async function getMessage(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Message retrieved successfully",
    data: await getMessageById(id),
  });
}

export async function replyMessage(req: Request, res: Response) {
  const { id } = req.params;
  const data: ReplyMessageInput = req.body;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  res.status(200).json({
    success: true,
    message: "Reply sent successfully",
    data: await replyMessageForAdmin(id, data.reply),
  });
}

export async function deactivateMessage(req: Request, res: Response) {
  const { id } = req.params;

  if (typeof id !== "string") {
    throw new BadRequestError();
  }

  return res.status(200).json({
    success: true,
    message: "Message deactivated successfully",
    data: await deactivateMessageById(id),
  });
}
