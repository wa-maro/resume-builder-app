import { Router } from "express";
import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { personalInfoAdminController } from "@personal-info/controllers";
import {
  editPersonalInfoBodySchema,
  personalInfoQuerySchema,
} from "@personal-info/validators";

const personalInfoAdminRouter = Router();

personalInfoAdminRouter
  .get(
    "/",
    validate({
      query: personalInfoQuerySchema,
      body: editPersonalInfoBodySchema,
    }),
    tryCatch(personalInfoAdminController.getPersonalInfos, "getPersonalInfos"),
  )
  .get(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(personalInfoAdminController.getPersonalInfo, "getPersonalInfo"),
  )
  .patch(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
      body: editPersonalInfoBodySchema,
    }),
    tryCatch(
      personalInfoAdminController.updatePersonalInfo,
      "updatePersonalInfo",
    ),
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(
      personalInfoAdminController.deletePersonalInfoAdmin,
      "deletePersonalInfo",
    ),
  );

export { personalInfoAdminRouter };
