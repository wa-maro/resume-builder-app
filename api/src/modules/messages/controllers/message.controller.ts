import { messageService } from "@messages/services";
import { CreateMessageInput } from "@messages/types";
import { Request, Response } from "express";

async function createMessage(req: Request, res: Response) {
  const data: CreateMessageInput = req.body;

  return res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: await messageService.createMessage(data),
  });
}

export const messageController = {
  createMessage,
};
