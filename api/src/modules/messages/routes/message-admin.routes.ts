import { validate } from "@http/middlewares";
import {
  deactivateMessage,
  getMessage,
  replyMessage,
} from "@messages/controllers";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { Router } from "express";
import { replyMessageSchema } from "../message.validation.js";

const messageAdminRouter = Router();

messageAdminRouter
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
