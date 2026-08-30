import { Router } from "express";
import validate from "../../http/middlewares/validation.middleware.js";
import tryCatch from "../../shared/utils/try-catch.util.js";
import { loginBodySchema, registerBodySchema } from "./auth.validation.js";
import { login, register } from "./auth.controller.js";

const authRouter = Router();

authRouter
  .post(
    "/register",
    validate({ body: registerBodySchema }),
    tryCatch(register, "register"),
  )
  .post(
    "/login",
    validate({ body: loginBodySchema }),
    tryCatch(login, "login"),
  );

export default authRouter;
