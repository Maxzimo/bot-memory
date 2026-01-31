const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");

const dataPath = path.join(__dirname, "../../data");

if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath, { recursive: true });
  console.log("📁 Carpeta data creada");
}

const dbPath = path.join(dataPath, "roles.db");
console.log("📁 DB path:", dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("❌ Error DB:", err);
  else console.log("✅ SQLite conectado");
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS roles (
      user_id TEXT PRIMARY KEY,
      role_id TEXT
    )
  `);
});

module.exports = db;


