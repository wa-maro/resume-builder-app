import { Router } from "express";
import tryCatch from "../../shared/utils/try-catch.util.js";
import { getUsers } from "./user-admin.controller.js";
import { UserQuerySchema } from "./user.validation.js";
import validate from "../../http/middlewares/validation.middleware.js";

const usersAdminRouter = Router();

usersAdminRouter.get(
  "/",
  validate({ query: UserQuerySchema }),
  tryCatch(getUsers, "getUsers"),
);

export default usersAdminRouter;
