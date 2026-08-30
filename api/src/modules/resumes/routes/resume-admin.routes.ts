import { Router } from "express";
import validate from "../../../http/middlewares/validation.middleware.js";
import tryCatch from "../../../shared/utils/try-catch.util.js";
import { getResumes } from "../controllers/resume-admin.controller.js";
import { ResumesQuerySchema } from "../resume.validation.js";

const resumesAdminRouter = Router();

resumesAdminRouter.get(
  "/",
  validate({ query: ResumesQuerySchema }),
  tryCatch(getResumes, "getResumes"),
);

export default resumesAdminRouter;
