import { validate } from "@http/middlewares";
import { createMessage } from "@messages/controllers";
import { tryCatch } from "@shared/utils";
import { Router } from "express";
import { createMessageSchema } from "@messages/validators";

const messageRouter = Router();

messageRouter.post(
  "/",
  validate({ body: createMessageSchema }),
  tryCatch(createMessage, "createMessage"),
);

export { messageRouter };
