import { Router } from "express";
import { requireFile, validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { createResumeBodySchema, editResumeBodySchema } from "@resumes";
import {
  changeMyResumeAvatar,
  createMyResume,
  deleteMyResume,
  editMyResume,
  getMyResume,
  getMyResumeAvatar,
} from "@resumes/controllers";
import { resumeUpload } from "@resumes";
import personalInfoRouter from "../../sections/personal-info/routes/personal-info.routes.js";

const resumeRouter = Router();

resumeRouter
  .post(
    "/",
    validate({ body: createResumeBodySchema }),
    tryCatch(createMyResume, "createMyResume"),
  )
  .get("/", tryCatch(getMyResume, "getMyResume"))
  .patch(
    "/:resumeId",
    validate({ params: paramsWithIDsSchema, body: editResumeBodySchema }),
    tryCatch(editMyResume, "editMyResume"),
  )
  .delete(
    "/:resumeId",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteMyResume, "deleteMyResume"),
  )
  .get(
    "/:resumeId/avatar",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getMyResumeAvatar, "getMyResumeAvatar"),
  )
  .patch(
    "/:resumeId/avatar",
    resumeUpload.single("avatar"),
    requireFile("avatar"),
    validate({ params: paramsWithIDsSchema }),
    tryCatch(changeMyResumeAvatar, "changeMyResumeAvatar"),
  );

resumeRouter.use("/:resumeId/personal-information", personalInfoRouter);

export { resumeRouter };
