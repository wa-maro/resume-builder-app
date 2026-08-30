import { Router } from "express";
import validate from "../../http/middlewares/validation.middleware.js";
import authenticate from "../../http/middlewares/authenticate.middleware.js";
import tryCatch from "../../shared/utils/try-catch.util.js";
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
