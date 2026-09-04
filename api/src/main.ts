import { envConfig } from "@config";
import { connectDatabase } from "@database";
import { infoLogger } from "@shared/utils";
import app from "./app.js";

async function bootstrap() {
  const PORT = envConfig.port;

  await connectDatabase();

  app.listen(PORT, () => {
    infoLogger.info(`Server running on port ${PORT}`);
  });
}

bootstrap();
