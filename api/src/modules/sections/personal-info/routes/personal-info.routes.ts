import { Router } from "express";
import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { personalInfoController } from "@personal-info/controllers";
import {
  addPersonalInfoBodySchema,
  editPersonalInfoBodySchema,
} from "@personal-info/validators";

const personalInfoRouter = Router({ mergeParams: true });

personalInfoRouter
  .post(
    "/",
    validate({
      params: paramsWithIDsSchema,
      body: addPersonalInfoBodySchema,
    }),
    tryCatch(personalInfoController.createPersonalInfo, "createPersonalInfo"),
  )
  .get("/", tryCatch(personalInfoController.getPersonalInfo, "getPersonalInfo"))
  .patch(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
      body: editPersonalInfoBodySchema,
    }),
    tryCatch(personalInfoController.updatePersonalInfo, "updatePersonalInfo"),
  );

export { personalInfoRouter };
