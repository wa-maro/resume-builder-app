import { validate } from "@http/middlewares";
import { getMessage } from "@messages/controllers";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { Router } from "express";

const messageAdminRouter = Router();

messageAdminRouter.get(
  "/:id",
  validate({
    params: paramsWithIDsSchema,
  }),
  tryCatch(getMessage, "getMessage"),
);

export { messageAdminRouter };
