const db = require("../database/database");

const ROLE_ID = "ACA_PONES_EL_ID_DEL_ROL";

module.exports = (client) => {
  client.on("guildMemberRemove", (member) => {
    if (!member.roles.cache.has(ROLE_ID)) return;

    db.run(
      `INSERT OR REPLACE INTO roles (user_id, role_id) VALUES (?, ?)`,
      [member.id, ROLE_ID],
      (err) => {
        if (err) console.error(err);
        else console.log(`💾 Rol guardado para ${member.user.tag}`);
      }
    );
  });
};


