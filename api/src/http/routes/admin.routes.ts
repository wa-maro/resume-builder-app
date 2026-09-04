import { Router } from "express";
import { usersAdminRouter } from "@users/routes";
import { resumesAdminRouter } from "@resumes/routes";
import { personalInfoAdminRouter } from "@personal-info/routes";

const adminRouter = Router();

adminRouter.use("/users", usersAdminRouter);
adminRouter.use("/resumes", resumesAdminRouter);
adminRouter.use("/personal-informations", personalInfoAdminRouter);

export { adminRouter };
