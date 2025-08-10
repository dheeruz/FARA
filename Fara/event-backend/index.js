const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "dheeraj123",
  database: "event_planner",
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// 📨 Insert contact message
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }
  try {
    const [result] = await pool.query(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );
    res.status(200).json({ message: "Message received successfully" });
  } catch (error) {
    console.error("❌ Insert error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// 📥 Get all contact messages
app.get("/api/contacts", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM contacts ORDER BY id DESC");
    res.status(200).json(rows);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ DELETE contact by ID (with logging)
app.delete("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log(`🔍 Trying to delete contact with ID: ${id}`);
    const [result] = await pool.query("DELETE FROM contacts WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      console.warn(`⚠️ No contact found with ID: ${id}`);
      return res.status(404).json({ error: "Contact not found" });
    }

    console.log(`✅ Contact with ID ${id} deleted`);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("❌ Delete error:", error);
    res.status(500).json({ error: "Database error while deleting contact" });
  }
});

// 📧 Update contact with reply
app.put("/api/contacts/:id/reply", async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;

  if (!reply) return res.status(400).json({ error: "Reply is required." });

  try {
    const [result] = await pool.query(
      "UPDATE contacts SET reply = ? WHERE id = ?",
      [reply, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }
    res.status(200).json({ message: "Reply saved successfully" });
  } catch (error) {
    console.error("❌ Reply update error:", error);
    res.status(500).json({ error: "Database error while saving reply" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
