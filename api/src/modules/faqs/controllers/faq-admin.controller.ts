import type { Request, Response } from "express";
import { CreateFAQInput } from "@faqs/types";
import { createForAdmin } from "../faq.repository.js";

export async function createFAQAdmin(req: Request, res: Response) {
  const data: CreateFAQInput = req.body;

  return res.status(201).json({
    success: true,
    message: "Personal information added successfully",
    data: await createForAdmin(data),
  });
}
