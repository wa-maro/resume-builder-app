import { Router } from "express";
import tryCatch from "../../../shared/utils/try-catch.util.js";
import { createMyResume } from "../controllers/resume.controller.js";
import validate from "../../../http/middlewares/validation.middleware.js";
import { createResumeBodySchema } from "../resume.validation.js";

const resumeRouter = Router();

resumeRouter.post(
  "/",
  validate({ body: createResumeBodySchema }),
  tryCatch(createMyResume, "createMyResume"),
);

export default resumeRouter;
