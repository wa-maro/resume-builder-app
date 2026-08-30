import { Router } from "express";
import resumeRouter from "../../modules/resumes/routes/resume.routes.js";

const userRouter = Router();

userRouter.use("/resume", resumeRouter);

export default userRouter;
