import { Router } from "express";
import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import {
  createPersonalInfo,
  getPersonalInfo,
  updatePersonalInfo,
} from "@personal-info/controllers";
import {
  addPersonalInfoBodySchema,
  editPersonalInfoBodySchema,
} from "@personal-info";

const personalInfoRouter = Router({ mergeParams: true });

personalInfoRouter
  .post(
    "/",
    validate({
      params: paramsWithIDsSchema,
      body: addPersonalInfoBodySchema,
    }),
    tryCatch(createPersonalInfo, "createPersonalInfo"),
  )
  .get("/", tryCatch(getPersonalInfo, "getPersonalInfo"))
  .patch(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
      body: editPersonalInfoBodySchema,
    }),
    tryCatch(updatePersonalInfo, "updatePersonalInfo"),
  );

export { personalInfoRouter };
