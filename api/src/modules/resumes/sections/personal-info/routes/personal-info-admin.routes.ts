import { Router } from "express";
import tryCatch from "../../../../../shared/utils/try-catch.util.js";
import {
  deletePersonalInfo,
  getPersonalInfo,
  getPersonalInfos,
  updatePersonalInfo,
} from "../controllers/personal-info-admin.controller.js";
import { paramsWithIDsSchema } from "../../../../../shared/validators/params-with-id.js";
import validate from "../../../../../http/middlewares/validation.middleware.js";
import {
  editPersonalInfoBodySchema,
  personalInfoQuerySchema,
} from "../personal-info.validation.js";

const personalInfoAdminRouter = Router();

personalInfoAdminRouter
  .get(
    "/",
    validate({
      query: personalInfoQuerySchema,
      body: editPersonalInfoBodySchema,
    }),
    tryCatch(getPersonalInfos, "getPersonalInfos"),
  )
  .get(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getPersonalInfo, "getPersonalInfo"),
  )
  .patch(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
      body: editPersonalInfoBodySchema,
    }),
    tryCatch(updatePersonalInfo, "updatePersonalInfo"),
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deletePersonalInfo, "deletePersonalInfo"),
  );

export default personalInfoAdminRouter;
