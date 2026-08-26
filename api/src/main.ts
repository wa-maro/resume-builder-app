import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./database/mongoose.js";

async function bootstrap() {
  const PORT = env.port;

  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

bootstrap();
