import { validate } from "@http/middlewares";
import {
  deactivateMessage,
  getMessage,
  getMessages,
  replyMessage,
} from "@messages/controllers";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { Router } from "express";
import {
  messageQuerySchema,
  replyMessageSchema,
} from "../message.validation.js";

const messageAdminRouter = Router();

messageAdminRouter
  .get(
    "/",
    validate({ query: messageQuerySchema }),
    tryCatch(getMessages, "getMessages"),
  )
  .get(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
    }),
    tryCatch(getMessage, "getMessage"),
  )
  .patch(
    "/:id/reply",
    validate({
      params: paramsWithIDsSchema,
      body: replyMessageSchema,
    }),
    tryCatch(replyMessage, "replyMessage"),
  )
  .delete(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
    }),
    tryCatch(deactivateMessage, "deactivateMessage"),
  );

export { messageAdminRouter };
