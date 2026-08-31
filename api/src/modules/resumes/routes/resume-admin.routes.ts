import { Router } from "express";
import validate from "../../../http/middlewares/validation.middleware.js";
import tryCatch from "../../../shared/utils/try-catch.util.js";
import {
  getResumes,
  getResume,
} from "../controllers/resume-admin.controller.js";
import { ResumesQuerySchema } from "../resume.validation.js";
import { paramsWithIDsSchema } from "../../../shared/validators/params-with-id.js";

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
  );

export default resumesAdminRouter;
