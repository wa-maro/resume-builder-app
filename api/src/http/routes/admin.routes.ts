import { Router } from "express";
import usersAdminRouter from "../../modules/users/user-admin.routes.js";
import resumesAdminRouter from "../../modules/resumes/routes/resume-admin.routes.js";

const adminRouter = Router();

adminRouter.use("/users", usersAdminRouter);
adminRouter.use("/resumes", resumesAdminRouter);

export default adminRouter;
