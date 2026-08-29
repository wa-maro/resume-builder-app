import { Router } from "express";
import adminRouter from "./admin.routes.js";
import authenticate from "../middlewares/authenticate.middleware.js";
import authorize from "../middlewares/authorize.middleware.js";
import { UserRole } from "../../modules/users/user.types.js";

const appRouter = Router();

appRouter.use("/admin", authenticate, authorize(UserRole.ADMIN), adminRouter);

export default appRouter;
