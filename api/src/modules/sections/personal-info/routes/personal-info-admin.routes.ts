import { Router } from "express";
import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import {
  deletePersonalInfoAdmin,
  getPersonalInfoAdmin,
  getPersonalInfosAdmin,
  updatePersonalInfoAdmin,
} from "@personal-info/controllers";
import {
  editPersonalInfoBodySchema,
  personalInfoQuerySchema,
} from "@personal-info";

const personalInfoAdminRouter = Router();

personalInfoAdminRouter
  .get(
    "/",
    validate({
      query: personalInfoQuerySchema,
      body: editPersonalInfoBodySchema,
    }),
    tryCatch(getPersonalInfosAdmin, "getPersonalInfos"),
  )
  .get(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getPersonalInfoAdmin, "getPersonalInfo"),
  )
  .patch(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
      body: editPersonalInfoBodySchema,
    }),
    tryCatch(updatePersonalInfoAdmin, "updatePersonalInfo"),
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deletePersonalInfoAdmin, "deletePersonalInfo"),
  );

export { personalInfoAdminRouter };
