import { Router } from "express";
import { usersAdminRouter } from "@users/routes";
import resumesAdminRouter from "../../modules/resumes/routes/resume-admin.routes.js";
import personalInfoAdminRouter from "../../modules/sections/personal-info/routes/personal-info-admin.routes.js";

const adminRouter = Router();

adminRouter.use("/users", usersAdminRouter);
adminRouter.use("/resumes", resumesAdminRouter);
adminRouter.use("/personal-informations", personalInfoAdminRouter);

export { adminRouter };
