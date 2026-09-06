import { Request, Response } from "express";
import { deactivateMessageById, getMessageById } from "@messages/services";
import { BadRequestError } from "@shared/errors";

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
