const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

// --------------------
// MIDDLEWARE
// --------------------
app.use(cors());
app.use(express.json());

// --------------------
// BASIC ROUTE
// --------------------
app.get("/", (req, res) => {
  res.send("Backend server is running");
});

// --------------------
// LOGIN (bcrypt)
// --------------------
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  const query =
    "SELECT id, username, password, role FROM users WHERE username = ?";

  db.query(query, [username], async (err, results) => {
    if (err) {
      console.error("Login error:", err.message);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Log login activity
    db.query(
      "INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)",
      [user.id, "LOGIN", `${user.username} logged in`]
    );

    // Send safe response (NO password)
    res.json({
      id: user.id,
      username: user.username,
      role: user.role,
    });
  });
});

// --------------------
// ADD EXPENSE
// --------------------
app.post("/expenses", (req, res) => {
  const { userId, amount, category, description, expense_date } = req.body;

  if (!userId || !amount || !expense_date) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const query =
    "INSERT INTO expenses (user_id, amount, category, description, expense_date) VALUES (?, ?, ?, ?, ?)";

  db.query(
    query,
    [userId, amount, category, description, expense_date],
    (err) => {
      if (err) {
        console.error("Add expense error:", err.message);
        return res.status(500).json({ message: "Failed to add expense" });
      }

      // Log activity
      db.query(
        "INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)",
        [userId, "ADD_EXPENSE", `Added expense of ₹${amount}`]
      );

      res.json({ message: "Expense added successfully" });
    }
  );
});

// --------------------
// GET USER EXPENSES
// --------------------
app.get("/expenses/:userId", (req, res) => {
  const { userId } = req.params;

  const query =
    "SELECT * FROM expenses WHERE user_id = ? ORDER BY expense_date DESC";

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Fetch expenses error:", err.message);
      return res.status(500).json({ message: "Failed to fetch expenses" });
    }

    res.json(results);
  });
});

// --------------------
// DELETE EXPENSE (OWNERSHIP CHECK)
// --------------------
app.delete("/expenses/:id", (req, res) => {
  const expenseId = req.params.id;
  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID required" });
  }

  const checkQuery =
    "SELECT * FROM expenses WHERE id = ? AND user_id = ?";

  db.query(checkQuery, [expenseId, userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error checking expense" });
    }

    if (results.length === 0) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this expense" });
    }

    db.query(
      "DELETE FROM expenses WHERE id = ?",
      [expenseId],
      (err) => {
        if (err) {
          return res.status(500).json({ message: "Delete failed" });
        }

        // Log activity
        db.query(
          "INSERT INTO activity_logs (user_id, action, details) VALUES (?, ?, ?)",
          [userId, "DELETE_EXPENSE", `Deleted expense ID ${expenseId}`]
        );

        res.json({ message: "Expense deleted successfully" });
      }
    );
  });
});

// --------------------
// ADMIN: VIEW ACTIVITY LOGS (VIKAS ONLY)
// --------------------
app.get("/admin/logs/:userId", (req, res) => {
  const { userId } = req.params;

  const roleQuery = "SELECT role FROM users WHERE id = ?";

  db.query(roleQuery, [userId], (err, result) => {
    if (err || result.length === 0) {
      return res.status(500).json({ message: "User check failed" });
    }

    if (result[0].role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied" });
    }

    const logsQuery = `
      SELECT a.id, u.username, a.action, a.details, a.action_time
      FROM activity_logs a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.action_time DESC
    `;

    db.query(logsQuery, (err, logs) => {
      if (err) {
        return res.status(500).json({ message: "Failed to fetch logs" });
      }

      res.json(logs);
    });
  });
});

// --------------------
// START SERVER
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
