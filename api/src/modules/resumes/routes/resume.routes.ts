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
  );

export default resumeRouter;
