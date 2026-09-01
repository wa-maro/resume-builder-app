import { Router } from "express";
import tryCatch from "../../shared/utils/try-catch.util.js";
import { getUser, getUsers } from "./user-admin.controller.js";
import { UserQuerySchema } from "./user.validation.js";
import validate from "../../http/middlewares/validation.middleware.js";
import { paramsWithIDsSchema } from "../../shared/validators/params-with-id.js";

const usersAdminRouter = Router();

usersAdminRouter
  .get(
    "/",
    validate({ query: UserQuerySchema }),
    tryCatch(getUsers, "getUsers"),
  )
  .get(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getUser, "getUser"),
  );

export default usersAdminRouter;
