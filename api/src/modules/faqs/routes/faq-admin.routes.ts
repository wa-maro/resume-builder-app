import { tryCatch } from "@shared/utils";
import { Router } from "express";
import { validate } from "@http/middlewares";
import {
  addFAQSchema,
  editFAQSchema,
  faqsQuerySchema,
} from "../faq.validation.js";
import {
  createFAQAdmin,
  deleteFAQForAdmin,
  getFAQAdmin,
  getFAQsAdmin,
  updateFAQForAdmin,
} from "@faqs/controllers";
import { paramsWithIDsSchema } from "@shared/validators";

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
  )
  .get(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getFAQAdmin, "getFAQAdmin"),
  )
  .patch(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
      body: editFAQSchema,
    }),
    tryCatch(updateFAQForAdmin, "updateFAQForAdmin"),
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteFAQForAdmin, "deleteFAQForAdmin"),
  );

export { faqsAdminRouter };
