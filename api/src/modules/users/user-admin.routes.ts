import { Router } from "express";
import tryCatch from "../../shared/utils/try-catch.util.js";
import {
  createUser,
  editUser,
  getUser,
  getUsers,
} from "./user-admin.controller.js";
import {
  createUserAdminBodySchema,
  editUserAdminBodySchema,
  UserQuerySchema,
} from "./user.validation.js";
import validate from "../../http/middlewares/validation.middleware.js";
import { paramsWithIDsSchema } from "../../shared/validators/params-with-id.js";

const usersAdminRouter = Router();

usersAdminRouter
  .post(
    "/",
    validate({ body: createUserAdminBodySchema }),
    tryCatch(createUser, "createUser"),
  )
  .get(
    "/",
    validate({ query: UserQuerySchema }),
    tryCatch(getUsers, "getUsers"),
  )
  .get(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(getUser, "getUser"),
  )
  .patch(
    "/:id",
    validate({ params: paramsWithIDsSchema, body: editUserAdminBodySchema }),
    tryCatch(editUser, "editUser"),
  );

export default usersAdminRouter;
