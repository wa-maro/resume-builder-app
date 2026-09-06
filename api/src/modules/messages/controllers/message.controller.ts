import { CreateMessageInput } from "@messages/types";
import { Request, Response } from "express";
import { createMessageForUser } from "../services/message.service.js";

export async function createMessage(req: Request, res: Response) {
  const data: CreateMessageInput = req.body;

  return res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: await createMessageForUser(data),
  });
}
