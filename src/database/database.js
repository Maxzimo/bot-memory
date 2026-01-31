const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../../data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

const dbPath = path.join(dataDir, "roles.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS config (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS roles (
      user_id TEXT PRIMARY KEY,
      role_id TEXT
    )
  `);
});

module.exports = db;


