import { Router } from "express";
import { tryCatch } from "@shared/utils";
import { getFaqs } from "@faqs/controllers";

const faqsRouter = Router();

faqsRouter.get("/", tryCatch(getFaqs, "getFaqs"));

export { faqsRouter };
