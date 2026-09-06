import { Router } from "express";
import { usersAdminRouter } from "@users/routes";
import { resumesAdminRouter } from "@resumes/routes";
import { personalInfoAdminRouter } from "@personal-info/routes";
import { messageAdminRouter } from "@messages/routes";

const adminRouter = Router();

adminRouter
  .use("/users", usersAdminRouter)
  .use("/resumes", resumesAdminRouter)
  .use("/personal-informations", personalInfoAdminRouter)
  .use("/messages", messageAdminRouter);

export { adminRouter };
