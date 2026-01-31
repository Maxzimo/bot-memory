const db = require("../database/database");
const { ROLE_ID } = require("../config/config");

module.exports = (client) => {
  client.on("guildMemberRemove", (member) => {
    console.log("🚪 Usuario salió:", member.user.tag);
    console.log("🎭 Roles:", member.roles.cache.map(r => r.id));

    if (!member.roles.cache.has(ROLE_ID)) {
      console.log("❌ No tenía el rol configurado");
      return;
    }

    db.run(
      `INSERT OR REPLACE INTO roles (user_id, role_id) VALUES (?, ?)`,
      [member.id, ROLE_ID],
      (err) => {
        if (err) console.error("❌ DB error:", err);
        else console.log("💾 Rol guardado correctamente");
      }
    );
  });
};

