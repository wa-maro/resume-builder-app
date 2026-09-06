import { Router } from "express";
import { resumeRouter } from "@resumes/routes";
import { personalInfoRouter } from "@personal-info/routes";

const userRouter = Router();

userRouter.use("/resume", resumeRouter);

resumeRouter.use("/:resumeId/personal-information", personalInfoRouter);

export { userRouter };
