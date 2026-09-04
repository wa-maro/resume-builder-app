import { Router } from "express";
import { authenticate, authorize } from "@http/middlewares";
import { UserRole } from "@users/types";
import { authRouter } from "@auth";
import { adminRouter } from "./admin.routes.js";
import { userRouter } from "./user.routes.js";

const appRouter = Router();

appRouter.use("/admin", authenticate, authorize(UserRole.ADMIN), adminRouter);

appRouter.use("/auth", authRouter);

appRouter.use("", authenticate, authorize(UserRole.USER), userRouter);

export { appRouter };
