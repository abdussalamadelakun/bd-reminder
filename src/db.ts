import { Pool } from "pg";

const pool = new Pool({
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
});

export default pool;
