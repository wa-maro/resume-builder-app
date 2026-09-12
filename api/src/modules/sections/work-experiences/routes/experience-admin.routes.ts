import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { workExperiencesAdminController } from "@work-experiences/controllers";
import {
  editWorkExperienceSchema,
  workExperienceQuerySchema,
} from "@work-experiences/validators";
import { Router } from "express";

const workExperiencesAdminRouter = Router();

workExperiencesAdminRouter
  .get(
    "/",
    validate({
      query: workExperienceQuerySchema,
    }),
    tryCatch(
      workExperiencesAdminController.getWorkExperiences,
      "getWorkExperiences",
    ),
  )
  .get(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
    }),
    tryCatch(
      workExperiencesAdminController.getWorkExperience,
      "getWorkExperience",
    ),
  )
  .patch(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
      body: editWorkExperienceSchema,
    }),
    tryCatch(
      workExperiencesAdminController.updateWorkExperience,
      "updateWorkExperience",
    ),
  )
  .delete(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
    }),
    tryCatch(
      workExperiencesAdminController.deleteWorkExperience,
      "deleteWorkExperience",
    ),
  );

export { workExperiencesAdminRouter };
