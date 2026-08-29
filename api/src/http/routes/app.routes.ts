import { Router } from "express";
import adminRouter from "./admin.routes.js";
import authenticate from "../middlewares/authenticate.middleware.js";

const appRouter = Router();

appRouter.use("/admin", authenticate, adminRouter);

export default appRouter;
