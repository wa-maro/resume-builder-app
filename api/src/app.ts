import { envConfig } from "@config";
import { httpLogger } from "@shared/utils";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./http/middlewares/error-handler.middleware.js";
import appRouter from "./http/routes/app.routes.js";

const app = express();

app.use((req: Request, _res: Response, next: NextFunction) => {
  httpLogger.http(`${req.method} ${req.url}`);

  next();
});

app.use(
  helmet({
    crossOriginResourcePolicy: false, // disable CORP for serving static files
  }),
);

app.use(
  cors({
    origin: envConfig.frontendOrigin,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1", appRouter);

app.use(errorHandler);

export default app;
