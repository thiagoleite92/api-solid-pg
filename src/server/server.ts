import { app } from "../app/app";
import { env } from "../env";

app
  .listen({
    port: env.PORT,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log(`🚢 HTTP SERVER RUNNING ON PORT: ${env.PORT}`);
  })
  .catch(() => {
    console.log("Deu ruim");
  });
