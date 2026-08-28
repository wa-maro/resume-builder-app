import { Router } from "express";
import adminRouter from "./admin.routes.js";

const appRouter = Router();

appRouter.use("/admin", adminRouter);

export default appRouter;
