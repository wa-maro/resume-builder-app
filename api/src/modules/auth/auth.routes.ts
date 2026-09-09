import { authenticate, validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { Router } from "express";
import {
  loginBodySchema,
  registerBodySchema,
  editProfileBodySchema,
} from "@auth/validators";
import { authController } from "./auth.controller.js";

const authRouter = Router();

authRouter
  .post(
    "/register",
    validate({ body: registerBodySchema }),
    tryCatch(authController.register, "register"),
  )
  .post(
    "/login",
    validate({ body: loginBodySchema }),
    tryCatch(authController.login, "login"),
  )
  .get(
    "/me",
    authenticate,
    tryCatch(authController.getUserProfile, "getUserProfile"),
  )
  .patch(
    "/me",
    validate({ body: editProfileBodySchema }),
    authenticate,
    tryCatch(authController.updateUserProfile, "updateUserProfile"),
  );

export { authRouter };
