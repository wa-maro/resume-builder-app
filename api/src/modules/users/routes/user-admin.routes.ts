import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { Router } from "express";
import {
  createUser,
  deleteUser,
  editUser,
  getUser,
  getUsers,
  toggleUserStatus,
} from "../user-admin.controller.js";
import {
  createUserAdminBodySchema,
  editUserAdminBodySchema,
  UserQuerySchema,
} from "../user.validation.js";

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
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(deleteUser, "deleteUser"),
  )
  .patch(
    "/:id/status",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(toggleUserStatus, "toggleUserStatus"),
  );

export { usersAdminRouter };
