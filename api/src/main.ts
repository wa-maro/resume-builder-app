import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./database/connection.js";
import { infoLogger } from "./shared/utils/loggers.util.js";

async function bootstrap() {
  const PORT = env.port;

  await connectDatabase();

  app.listen(PORT, () => {
    infoLogger.info(`Server running at http://localhost:${PORT}`);
  });
}

bootstrap();
