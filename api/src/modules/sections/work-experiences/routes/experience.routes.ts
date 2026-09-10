import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { workExperiencesController } from "@work-experiences/controllers";
import { Router } from "express";

const workExperiencesRouter = Router({ mergeParams: true });

workExperiencesRouter.get(
  "/",
  validate({
    params: paramsWithIDsSchema,
  }),
  tryCatch(workExperiencesController.getWorkExperiences, "getWorkExperiences"),
);

export { workExperiencesRouter };
