import { Router } from "express";
import resumeRouter from "../../modules/resume/routes/resume.routes.js";

const userRouter = Router();

userRouter.use("/resume", resumeRouter);

export default userRouter;
