import { faqService } from "@faqs/services";
import type { Request, Response } from "express";

async function getFaqs(_req: Request, res: Response) {
  return res.status(201).json({
    success: true,
    message: "FAQs retrieved successfully",
    data: await faqService.findActiveFAQs(),
  });
}

export const faqController = {
  getFaqs,
};
