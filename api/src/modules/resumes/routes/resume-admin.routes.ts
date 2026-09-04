import { Router } from "express";
import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import {
  getResumes,
  getResume,
  editResume,
  deleteResume,
  toggleResumeStatus,
} from "@resumes/controllers";
import { editResumeBodySchema, ResumesQuerySchema } from "@resumes";

const resumesAdminRouter = Router();

resumesAdminRouter
  .get(
    "/",
    validate({ query: ResumesQuerySchema }),
    tryCatch(getResumes, "getResumes"),
  )
  .get(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getResume, "getResume"),
  )
  .patch(
    "/:id",
    validate({ params: paramsWithIDsSchema, body: editResumeBodySchema }),
    tryCatch(editResume, "editResume"),
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteResume, "deleteResume"),
  )
  .patch(
    "/:id/status",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(toggleResumeStatus, "toggleResumeStatus"),
  );

export { resumesAdminRouter };
