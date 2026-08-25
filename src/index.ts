import cron from "node-cron";
import dotenv from "dotenv";

import { fileURLToPath } from "url";
import { join, dirname } from "path";
import { Client, Pool } from "pg";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  override: true,
  path: join(__dirname, "../development.env"),
});

// const birthdays = [
//   { "Abdus-Salam Adelakun": "18/07/2004" },
//   { "Test Data": "20/08/2004" },
// ];

const profiles = [
  { fullName: "Abdus-Salam Adelakun", dateOfBirth: "2026-07-18" },
  { fullName: "Test Data", dateOfBirth: "2026-08-20" },
];

const pool = new Pool();

(async () => {
  const client = await pool.connect();

  try {
    const result = await client.query("SELECT current_user");
    console.log(result);
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
})();

cron.schedule("34 19 * * *", () => {
  const currentDate = new Date();
  console.log(currentDate);

  for (const profile of profiles) {
    // const birthMonth: string = profile.dateOfBirth.split("-")[1];
    // const birthDay: string = profile.dateOfBirth.split("-")[2];
    const birthMonth = profile.dateOfBirth.split("-")[1];
    const birthDay = profile.dateOfBirth.split("-")[2];
    if (
      String(currentDate.getMonth() + 1).padStart(2, "0") == birthMonth &&
      String(currentDate.getDate()).padStart(2, "0") == birthDay
    ) {
      console.log(`Happy birthday, ${profile.fullName}`);
    }
  }
});
