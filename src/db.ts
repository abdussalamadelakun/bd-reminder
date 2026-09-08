import { Pool } from "pg";
import dotenv from "dotenv";

import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  override: true,
  path: join(__dirname, "../development.env"),
});

const pool = new Pool({
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
});

export default pool;
