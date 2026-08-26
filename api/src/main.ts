import app from "./app.js";
import { env } from "./config/env.js";

async function bootstrap() {
  const PORT = env.port;

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

bootstrap();
