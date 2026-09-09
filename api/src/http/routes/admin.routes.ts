import { Router } from "express";
import { usersAdminRouter } from "@users/routes";
import { resumesAdminRouter } from "@resumes/routes";
import { personalInfoAdminRouter } from "@personal-info/routes";
import { messageAdminRouter } from "@messages/routes";
import { faqsAdminRouter } from "@faqs/routes";
import { dashboardAdminRouter } from "@dashboard/routes";
import { experiencesAdminRouter } from "@work-experiences/routes";
import { skillsAdminRouter } from "@skills/routes";

const adminRouter = Router();

adminRouter
  .use("/dashboard", dashboardAdminRouter)
  .use("/users", usersAdminRouter)
  .use("/resumes", resumesAdminRouter)
  .use("/personal-informations", personalInfoAdminRouter)
  .use("/work-experiences", experiencesAdminRouter)
  .use("/work-experiences", skillsAdminRouter)
  .use("/messages", messageAdminRouter)
  .use("/faqs", faqsAdminRouter);

export { adminRouter };
