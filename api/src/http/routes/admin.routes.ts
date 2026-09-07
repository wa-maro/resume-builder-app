import { Router } from "express";
import { usersAdminRouter } from "@users/routes";
import { resumesAdminRouter } from "@resumes/routes";
import { personalInfoAdminRouter } from "@personal-info/routes";
import { messageAdminRouter } from "@messages/routes";
import { faqsAdminRouter } from "@faqs/routes";
import { dashboardAdminRouter } from "@dashboard/routes";

const adminRouter = Router();

adminRouter
  .use("/dashboard", dashboardAdminRouter)
  .use("/users", usersAdminRouter)
  .use("/resumes", resumesAdminRouter)
  .use("/personal-informations", personalInfoAdminRouter)
  .use("/messages", messageAdminRouter)
  .use("/faqs", faqsAdminRouter);

export { adminRouter };
