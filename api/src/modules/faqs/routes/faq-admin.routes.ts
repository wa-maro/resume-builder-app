import { tryCatch } from "@shared/utils";
import { Router } from "express";
import { validate } from "@http/middlewares";
import { addFAQSchema, editFAQSchema, faqQuerySchema } from "@faqs/validators";
import { faqAdminController } from "@faqs/controllers";
import { paramsWithIDsSchema } from "@shared/validators";

const faqsAdminRouter = Router();

faqsAdminRouter
  .post(
    "/",
    validate({ body: addFAQSchema }),
    tryCatch(faqAdminController.createFAQ, "createFAQ"),
  )
  .get(
    "/",
    validate({ query: faqQuerySchema }),
    tryCatch(faqAdminController.getFAQs, "getFAQs"),
  )
  .get(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(faqAdminController.getFAQ, "getFAQ"),
  )
  .patch(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
      body: editFAQSchema,
    }),
    tryCatch(faqAdminController.updateFAQ, "updateFAQ"),
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(faqAdminController.deleteFAQ, "deleteFAQ"),
  )
  .patch(
    "/:id/status",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(faqAdminController.toggleFAQStatus, "toggleFAQStatus"),
  );

export { faqsAdminRouter };
