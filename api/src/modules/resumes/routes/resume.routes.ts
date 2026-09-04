import { Router } from "express";
import tryCatch from "../../../shared/utils/try-catch.util.js";
import {
  createMyResume,
  deleteMyResume,
  editMyResume,
  getMyResume,
} from "../controllers/resume.controller.js";
import validate from "../../../http/middlewares/validation.middleware.js";
import {
  createResumeBodySchema,
  editResumeBodySchema,
} from "../resume.validation.js";
import { paramsWithIDsSchema } from "../../../shared/validators/params-with-id.js";
import personalInfoRouter from "../../sections/personal-info/routes/personal-info.routes.js";
import { resumeUpload } from "../resume-upload.js";

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
    resumeUpload.single("avatar"),
    validate({ params: paramsWithIDsSchema, body: editResumeBodySchema }),
    tryCatch(editMyResume, "editMyResume"),
  )
  .delete(
    "/:resumeId",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteMyResume, "deleteMyResume"),
  );

resumeRouter.use("/:resumeId/personal-information", personalInfoRouter);

export default resumeRouter;
