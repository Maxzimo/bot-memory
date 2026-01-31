const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "../../data/roles.db")
);

db.run(`
CREATE TABLE IF NOT EXISTS saved_role (
  user_id TEXT,
  guild_id TEXT,
  PRIMARY KEY (user_id, guild_id)
)
`);

module.exports = db;
