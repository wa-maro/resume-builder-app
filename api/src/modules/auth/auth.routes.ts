import { Router } from "express";
import validate from "../../http/middlewares/validation.middleware.js";
import tryCatch from "../../shared/utils/try-catch.util.js";
import { registerBodySchema } from "./auth.validation.js";
import { register } from "./auth.controller.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validate({ body: registerBodySchema }),
  tryCatch(register, "register"),
);

export default authRouter;
