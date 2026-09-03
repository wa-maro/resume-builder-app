import { Router } from "express";
import tryCatch from "../../../../../shared/utils/try-catch.util.js";
import {
  deletePersonalInfo,
  getPersonalInfo,
} from "../controllers/personal-info-admin.controller.js";
import { paramsWithIDsSchema } from "../../../../../shared/validators/params-with-id.js";
import validate from "../../../../../http/middlewares/validation.middleware.js";

const personalInfoAdminRouter = Router();

personalInfoAdminRouter
  .get(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getPersonalInfo, "getPersonalInfo"),
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deletePersonalInfo, "deletePersonalInfo"),
  );
export default personalInfoAdminRouter;
