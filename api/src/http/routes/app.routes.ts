import { Router } from "express";
import { authenticate, authorize } from "@http/middlewares";
import { UserRole } from "@users/types";
import { authRouter } from "@auth";
import { adminRouter } from "./admin.routes.js";
import { userRouter } from "./user.routes.js";
import { messageRouter } from "@messages/routes";
import { faqsRouter } from "@faqs/routes";

const appRouter = Router();

appRouter
  .use("/auth", authRouter)
  .use("/messages", messageRouter)
  .use("/faqs", faqsRouter)
  .use("/admin", authenticate, authorize(UserRole.ADMIN), adminRouter)
  .use("", authenticate, authorize(UserRole.USER), userRouter);

export { appRouter };
