import { Router } from "express";
import { resumeRouter } from "@resumes/routes";
import { personalInfoRouter } from "@personal-info/routes";
import { experiencesRouter } from "@work-experiences/routes";
import { skillsRouter } from "@skills/routes";
import { refereesRouter } from "@referees/routes";

const userRouter = Router();

userRouter.use("/resume", resumeRouter);

resumeRouter
  .use("/:resumeId/personal-information", personalInfoRouter)
  .use("/:resumeId/work-experiences", experiencesRouter)
  .use("/:resumeId/skills", skillsRouter)
  .use("/:resumeId/referees", refereesRouter);

export { userRouter };
