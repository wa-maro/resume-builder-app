import { tryCatch } from "@shared/utils";
import { Router } from "express";
import { validate } from "@http/middlewares";
import { addFAQSchema, faqsQuerySchema } from "../faq.validation.js";
import { createFAQAdmin, getFAQsAdmin } from "@faqs/controllers";

const faqsAdminRouter = Router();

faqsAdminRouter
  .post(
    "/",
    validate({ body: addFAQSchema }),
    tryCatch(createFAQAdmin, "createFAQAdmin"),
  )
  .get(
    "/",
    validate({ query: faqsQuerySchema }),
    tryCatch(getFAQsAdmin, "getFAQsAdmin"),
  );

export { faqsAdminRouter };
