import { Router } from "express";
import { resumeRouter } from "@resumes/routes";

const userRouter = Router();

userRouter.use("/resume", resumeRouter);

export { userRouter };
