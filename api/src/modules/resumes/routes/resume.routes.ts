import { Router } from "express";
import tryCatch from "../../../shared/utils/try-catch.util.js";
import {
  changeMyResumeAvatar,
  createMyResume,
  deleteMyResume,
  editMyResume,
  getMyResume,
  getMyResumeAvatar,
} from "../controllers/resume.controller.js";
import validate from "../../../http/middlewares/validation.middleware.js";
import {
  createResumeBodySchema,
  editResumeBodySchema,
} from "../resume.validation.js";
import { paramsWithIDsSchema } from "../../../shared/validators/params-with-id.js";
import personalInfoRouter from "../../sections/personal-info/routes/personal-info.routes.js";
import { resumeUpload } from "../resume-upload.js";
import requireFile from "../../../http/middlewares/require-file.middleware.js";

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

export default resumeRouter;
