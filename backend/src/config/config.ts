import { config as dotenvConfig } from "dotenv";

interface Config {
  env?: string;
  port?: number;
  databaseUrl?: string;
  jwtSecret?: string;
  sessionSecret?: string;
}

dotenvConfig();

export const config: Config = {
  env: process.env.NODE_ENV || "development",
  port: Number(process.env.PORT) || 4000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  sessionSecret: process.env.SESSION_SECRET,
};
