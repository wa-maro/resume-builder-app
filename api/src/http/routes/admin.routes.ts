import { Router } from "express";
import usersAdminRouter from "../../modules/users/user-admin.routes.js";

const adminRouter = Router();

adminRouter.use("/users", usersAdminRouter);

export default adminRouter;
