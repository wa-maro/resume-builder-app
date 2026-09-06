import { tryCatch } from "@shared/utils";
import { Router } from "express";
import { validate } from "@http/middlewares";
import { addFAQSchema } from "../faq.validation.js";
import { createFAQAdmin } from "@faqs/controllers";

const faqsAdminRouter = Router();

faqsAdminRouter.post(
  "/",
  validate({ body: addFAQSchema }),
  tryCatch(createFAQAdmin, "createFAQAdmin"),
);

export { faqsAdminRouter };
