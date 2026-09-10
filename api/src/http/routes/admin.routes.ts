import { Router } from "express";
import { usersAdminRouter } from "@users/routes";
import { resumesAdminRouter } from "@resumes/routes";
import { personalInfoAdminRouter } from "@personal-info/routes";
import { messageAdminRouter } from "@messages/routes";
import { faqsAdminRouter } from "@faqs/routes";
import { dashboardAdminRouter } from "@dashboard/routes";
import { workExperiencesAdminRouter } from "@work-experiences/routes";
import { skillsAdminRouter } from "@skills/routes";
import { refereesAdminRouter } from "@referees/routes";
import { projectsAdminRouter } from "@projects/routes";

const adminRouter = Router();

adminRouter
  .use("/dashboard", dashboardAdminRouter)
  .use("/users", usersAdminRouter)
  .use("/resumes", resumesAdminRouter)
  .use("/personal-informations", personalInfoAdminRouter)
  .use("/work-experiences", workExperiencesAdminRouter)
  .use("/projects", projectsAdminRouter)
  .use("/skills", skillsAdminRouter)
  .use("/referees", refereesAdminRouter)
  .use("/messages", messageAdminRouter)
  .use("/faqs", faqsAdminRouter);

export { adminRouter };
