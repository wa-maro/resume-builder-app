import { validate } from "@http/middlewares";
import { messageAdminController } from "@messages/controllers";
import { tryCatch } from "@shared/utils";
import { paramsWithIDsSchema } from "@shared/validators";
import { Router } from "express";
import { messageQuerySchema, replyMessageSchema } from "@messages/validators";

const messageAdminRouter = Router();

messageAdminRouter
  .get(
    "/",
    validate({ query: messageQuerySchema }),
    tryCatch(messageAdminController.getMessages, "getMessages"),
  )
  .get(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
    }),
    tryCatch(messageAdminController.getMessage, "getMessage"),
  )
  .patch(
    "/:id/reply",
    validate({
      params: paramsWithIDsSchema,
      body: replyMessageSchema,
    }),
    tryCatch(messageAdminController.replyMessage, "replyMessage"),
  )
  .delete(
    "/:id",
    validate({
      params: paramsWithIDsSchema,
    }),
    tryCatch(messageAdminController.deactivateMessage, "deactivateMessage"),
  );

export { messageAdminRouter };
