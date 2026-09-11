import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { workExperiencesController } from "@work-experiences/controllers";
import { addWorkExperienceSchema } from "@work-experiences/validators";
import { Router } from "express";

const workExperiencesRouter = Router({ mergeParams: true });

workExperiencesRouter
  .post(
    "/",
    validate({
      params: paramsWithIDsSchema,
      body: addWorkExperienceSchema,
    }),
    tryCatch(workExperiencesController.addWorkExperience, "addWorkExperience"),
  )
  .get(
    "/",
    validate({
      params: paramsWithIDsSchema,
    }),
    tryCatch(
      workExperiencesController.getWorkExperiences,
      "getWorkExperiences",
    ),
  )
  .delete(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
    }),
    tryCatch(workExperiencesController.deleteWorkExperience, ""),
  );

export { workExperiencesRouter };
