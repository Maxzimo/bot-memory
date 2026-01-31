const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dataPath = path.join(__dirname, "../../data");
if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath);

const dbPath = path.join(dataPath, "roles.db");

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS roles (
      user_id TEXT PRIMARY KEY,
      role_id TEXT
    )
  `);
});

module.exports = db;

