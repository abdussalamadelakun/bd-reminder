import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  port: 5432,
  database: "development_db",
  host: "localhost",
  password: "salam@postgres",
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS profiles (
id SERIAL PRIMARY KEY,
full_name TEXT NOT NULL,
date_of_birth TEXT NOT NULL, 
email TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

`;

(async () => {
  const client = await pool.connect();
  try {
    const res = await client.query(createTableQuery);
    console.log(res);
  } catch (err) {
    console.error(err);
  } finally {
    //client.release();
    pool.end();
  }
})();

