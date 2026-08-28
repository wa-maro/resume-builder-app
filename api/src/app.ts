import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { httpLogger } from "./shared/utils/loggers.util.js";
import errorHandler from "./http/middlewares/error-handler.middleware.js";
import { env } from "./config/env.js";
import appRouter from "./http/routes/app.routes.js";

const app = express();

app.use((req, _res, next) => {
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
    origin: env.frontendOrigin,
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
