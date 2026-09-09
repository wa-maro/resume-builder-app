import { Router } from "express";
import { tryCatch } from "@shared/utils";
import { faqController } from "@faqs/controllers";

const faqsRouter = Router();

faqsRouter.get("/", tryCatch(faqController.getFaqs, "getFaqs"));

export { faqsRouter };
