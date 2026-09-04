import { Router } from "express";
import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import {
  addPersonalInfoBodySchema,
  editPersonalInfoBodySchema,
} from "../personal-info.validation.js";
import {
  createPersonalInfo,
  getPersonalInfo,
  updatePersonalInfo,
} from "../controllers/personal-info.controller.js";

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

export default personalInfoRouter;
