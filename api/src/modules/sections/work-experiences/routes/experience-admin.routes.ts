import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { workExperiencesAdminController } from "@work-experiences/controllers";
import { workExperienceQuerySchema } from "@work-experiences/validators";
import { Router } from "express";

const workExperiencesAdminRouter = Router();

workExperiencesAdminRouter.get(
  "/",
  validate({ query: workExperienceQuerySchema }),
  tryCatch(
    workExperiencesAdminController.getWorkExperiences,
    "getWorkExperiences",
  ),
);

export { workExperiencesAdminRouter };
