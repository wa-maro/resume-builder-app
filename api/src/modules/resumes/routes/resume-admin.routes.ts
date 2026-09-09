import { Router } from "express";
import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { resumeAdminController } from "@resumes/controllers";
import { editResumeBodySchema, resumeQuerySchema } from "@resumes/validators";

const resumesAdminRouter = Router();

resumesAdminRouter
  .get(
    "/",
    validate({ query: resumeQuerySchema }),
    tryCatch(resumeAdminController.getResumes, "getResumes"),
  )
  .get(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(resumeAdminController.getResume, "getResume"),
  )
  .patch(
    "/:id",
    validate({ params: paramsWithIDsSchema, body: editResumeBodySchema }),
    tryCatch(resumeAdminController.editResume, "editResume"),
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(resumeAdminController.deleteResume, "deleteResume"),
  )
  .patch(
    "/:id/status",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(resumeAdminController.toggleResumeStatus, "toggleResumeStatus"),
  );

export { resumesAdminRouter };
