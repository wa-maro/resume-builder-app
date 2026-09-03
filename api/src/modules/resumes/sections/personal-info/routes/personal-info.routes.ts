import { Router } from "express";
import validate from "../../../../../http/middlewares/validation.middleware.js";
import { paramsWithIDsSchema } from "../../../../../shared/validators/params-with-id.js";
import { addPersonalInfoBodySchema } from "../personal-info.validation.js";
import {
  createPersonalInfo,
  getPersonalInfo,
} from "../controllers/personal-info.controller.js";
import tryCatch from "../../../../../shared/utils/try-catch.util.js";

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
  .get(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getPersonalInfo, "getPersonalInfo"),
  );

export default personalInfoRouter;
