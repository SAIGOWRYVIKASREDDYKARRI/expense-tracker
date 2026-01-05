const bcrypt = require("bcrypt");
const db = require("./db");

const users = [
  { id: 1, password: "vikas123" },
  { id: 2, password: "abhi123" },
  { id: 3, password: "ayyappa123" },
];

(async () => {
  for (let user of users) {
    const hash = await bcrypt.hash(user.password, 10);

    db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hash, user.id],
      (err) => {
        if (err) {
          console.error("Error hashing user", user.id);
        } else {
          console.log(`✅ Password hashed for user ${user.id}`);
        }
      }
    );
  }
})();
