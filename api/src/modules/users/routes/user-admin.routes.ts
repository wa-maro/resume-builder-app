import { Router } from "express";
import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
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
  userQuerySchema,
} from "@users/validators";

const usersAdminRouter = Router();

usersAdminRouter
  .post(
    "/",
    validate({ body: createUserAdminBodySchema }),
    tryCatch(createUser, "createUser"),
  )
  .get(
    "/",
    validate({ query: userQuerySchema }),
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
