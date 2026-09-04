import { envConfig } from "@config";
import app from "./app.js";
import { connectDatabase } from "./database/connection.js";
import { infoLogger } from "./shared/utils/loggers.util.js";

async function bootstrap() {
  const PORT = envConfig.port;

  await connectDatabase();

  app.listen(PORT, () => {
    infoLogger.info(`Server running on port ${PORT}`);
  });
}

bootstrap();
