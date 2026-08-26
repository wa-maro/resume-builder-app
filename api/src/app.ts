import express from "express";
import { httpLogger } from "./shared/utils/loggers.util.js";
import errorHandler from "./http/middlewares/error-handler.middleware.js";

const app = express();

app.use((req, _res, next) => {
  httpLogger.http(`${req.method} ${req.url}`);

  next();
});

app.get("/api/v1/hello-world", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Hello World!",
  });
});

app.use(errorHandler);

export default app;
