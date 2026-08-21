import cron from "node-cron";

// const birthdays = [
//   { "Abdus-Salam Adelakun": "18/07/2004" },
//   { "Lanre Anozie": "11/16/2005" },
//   { "Test Data": "20/08/2004" },
// ];

const profiles = [
  { fullName: "Abdus-Salam Adelakun", dateOfBirth: "2026-07-18" },
  { fullName: "Test Data", dateOfBirth: "2026-08-20" },
];

cron.schedule("34 19 * * *", () => {
  const currentDate = new Date();
  console.log(currentDate);

  for (const profile of profiles) {
    const birthMonth: string = profile.dateOfBirth.split("-")[1];
    const birthDay: string = profile.dateOfBirth.split("-")[2];
    if (
      String(currentDate.getMonth() + 1).padStart(2, "0") == birthMonth &&
      String(currentDate.getDate()).padStart(2, "0") == birthDay
    ) {
      console.log(`Happy birthday, ${profile.fullName}`);
    }
  }
});
