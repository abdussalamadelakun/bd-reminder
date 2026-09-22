import pool from "./db.js";
import cron from "node-cron";
import express from "express";

// import { fileURLToPath } from "url";
// import { join, dirname } from "path";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// dotenv.config({
//   override: true,
//   path: join(__dirname, "../development.env"),
// });

import profileRoutes from "./routes/profiles.js";

const app = express();
app.use(express.json());
app.use("/profiles", profileRoutes);

// const birthdays = [
//   { "Abdus-Salam Adelakun": "18/07/2004" },
//   { "Test Data": "20/08/2004" },
// ];

const profiles = [
  { fullName: "Abdus-Salam Adelakun", dateOfBirth: "2026-07-18" },
  { fullName: "Test Data", dateOfBirth: "2026-08-20" },
];

// (async () => {
//   const client = await pool.connect();

//   try {
//     const result = await client.query("SELECT current_user");
//     console.log(result);
//   } catch (err) {
//     console.error(err);
//   } finally {
//     client.release();
//   }
// })();

cron.schedule("35 11 * * *", async () => {
  const currentDate = new Date();
  const isoDateString = currentDate.toISOString().split("T")[0]?.substring(5);
  const query = `SELECT * from profiles WHERE date_of_birth LIKE $1`;
  const values = ["%" + isoDateString];
  const result = await pool.query(query, values);
  console.log(`Happy birthday, ${result.rows[0].full_name}`);

  console.log(currentDate);

  // for (const profile of profiles) {
  //   // const birthMonth: string = profile.dateOfBirth.split("-")[1];
  //   // const birthDay: string = profile.dateOfBirth.split("-")[2];
  //   const birthMonth = profile.dateOfBirth.split("-")[1];
  //   const birthDay = profile.dateOfBirth.split("-")[2];
  //   if (
  //     String(currentDate.getMonth() + 1).padStart(2, "0") == birthMonth &&
  //     String(currentDate.getDate()).padStart(2, "0") == birthDay
  //   ) {
  //     console.log(`Happy birthday, ${profile.fullName}`);
  //   }
  // }
});

app.listen(8080, () => {
  console.log("App listening on port 8080");
});
