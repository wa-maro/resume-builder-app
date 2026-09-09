import { Router } from "express";
import { validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { userAdminController } from "../user-admin.controller.js";
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
    tryCatch(userAdminController.createUser, "createUser"),
  )
  .get(
    "/",
    validate({ query: userQuerySchema }),
    tryCatch(userAdminController.getUsers, "getUsers"),
  )
  .get(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(userAdminController.getUser, "getUser"),
  )
  .patch(
    "/:id",
    validate({ params: paramsWithIDsSchema, body: editUserAdminBodySchema }),
    tryCatch(userAdminController.editUser, "editUser"),
  )
  .delete(
    "/:id",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(userAdminController.deleteUser, "deleteUser"),
  )
  .patch(
    "/:id/status",
    validate({ params: paramsWithIDsSchema }),
    tryCatch(userAdminController.toggleUserStatus, "toggleUserStatus"),
  );

export { usersAdminRouter };
