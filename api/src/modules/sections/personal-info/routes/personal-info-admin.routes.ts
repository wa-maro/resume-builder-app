import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { Router } from "express";
import {
  deletePersonalInfo,
  getPersonalInfo,
  getPersonalInfos,
  updatePersonalInfo,
} from "../controllers/personal-info-admin.controller.js";
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
