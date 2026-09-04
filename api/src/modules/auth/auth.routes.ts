import { authenticate, validate } from "@http/middlewares";
import { tryCatch } from "@shared/utils";
import { Router } from "express";
import {
  loginBodySchema,
  registerBodySchema,
  editProfileBodySchema,
} from "./auth.validation.js";
import {
  getUserProfile,
  login,
  register,
  updateUserProfile,
} from "./auth.controller.js";

const authRouter = Router();

authRouter
  .post(
    "/register",
    validate({ body: registerBodySchema }),
    tryCatch(register, "register"),
  )
  .post("/login", validate({ body: loginBodySchema }), tryCatch(login, "login"))
  .get("/me", authenticate, tryCatch(getUserProfile, "getUserProfile"))
  .patch(
    "/me",
    validate({ body: editProfileBodySchema }),
    authenticate,
    tryCatch(updateUserProfile, "updateUserProfile"),
  );

export default authRouter;
