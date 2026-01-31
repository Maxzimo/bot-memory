require("dotenv").config();
const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

// 📂 carpeta data
const dataDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// 🗄️ base de datos
const dbPath = path.join(dataDir, "roles.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) console.error("❌ Error DB:", err);
  else console.log("✅ DB conectada");
});

// 🧱 tabla
db.run(`
  CREATE TABLE IF NOT EXISTS roles (
    guild_id TEXT,
    user_id TEXT,
    role_id TEXT
  )
`);

client.once("ready", () => {
  console.log(`🤖 Bot conectado como ${client.user.tag}`);
});

// 👋 evento miembro nuevo
client.on("guildMemberAdd", async (member) => {
  console.log(`👋 ${member.user.tag} entró`);

  db.all(
    "SELECT role_id FROM roles WHERE guild_id = ? AND user_id = ?",
    [member.guild.id, member.id],
    async (err, rows) => {
      if (err) return console.error(err);

      for (const row of rows) {
        const role = member.guild.roles.cache.get(row.role_id);
        if (role) {
          await member.roles.add(role);
        }
      }
    }
  );
});

client.login(process.env.TOKEN);

