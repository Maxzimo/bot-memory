import fs from "fs";
import path from "path";
import sqlite3 from "sqlite3";

const dataDir = path.resolve("./data");

// crear carpeta data si no existe
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const dbPath = path.join(dataDir, "roles.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error SQLite:", err.message);
  } else {
    console.log("✅ SQLite conectado");
  }
});

export default db;
