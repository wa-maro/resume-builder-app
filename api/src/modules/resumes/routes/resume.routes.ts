import { Router } from "express";
import { requireFile, validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import {
  createResumeBodySchema,
  editResumeBodySchema,
} from "@resumes/validators";
import { resumeController } from "@resumes/controllers";
import { resumeUpload } from "@resumes";

const resumeRouter = Router();

resumeRouter
  .post(
    "/",
    validate({ body: createResumeBodySchema }),
    tryCatch(resumeController.createMyResume, "createMyResume"),
  )
  .get("/", tryCatch(resumeController.getMyResume, "getMyResume"))
  .patch(
    "/:resumeId",
    validate({ params: paramsWithIDsSchema, body: editResumeBodySchema }),
    tryCatch(resumeController.editMyResume, "editMyResume"),
  )
  .delete(
    "/:resumeId",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(resumeController.deleteMyResume, "deleteMyResume"),
  )
  .get(
    "/:resumeId/avatar",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(resumeController.getMyResumeAvatar, "getMyResumeAvatar"),
  )
  .patch(
    "/:resumeId/avatar",
    resumeUpload.single("avatar"),
    requireFile("avatar"),
    validate({ params: paramsWithIDsSchema }),
    tryCatch(resumeController.changeMyResumeAvatar, "changeMyResumeAvatar"),
  );

export { resumeRouter };
