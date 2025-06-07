import { Client, config } from "../deps.ts";

const env = config();

const client = new Client();
await client.connect({
  hostname: env.DB_HOST || "localhost",
  port: parseInt(env.DB_PORT || "3306"),
  username: env.DB_USER || "root",
  password: env.DB_PASSWORD || "",
  db: env.DB_NAME || "planetary_db",
});

export default client;