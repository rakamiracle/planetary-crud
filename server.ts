import { Application } from "./deps.ts";
import planetRoutes from "./routes/planetRoutes.ts";
import moonRoutes from "./routes/moonRoutes.ts";

const app = new Application();

app.use(planetRoutes.routes());
app.use(planetRoutes.allowedMethods());
app.use(moonRoutes.routes());
app.use(moonRoutes.allowedMethods());

console.log("Server running on port 8000");
await app.listen({ port: 8000 });