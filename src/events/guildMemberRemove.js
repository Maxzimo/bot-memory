const db = require("../database/database");

module.exports = (client) => {
  client.on("guildMemberRemove", member => {
    db.get(
      `SELECT value FROM config WHERE key = 'role_id'`,
      (err, row) => {
        if (err || !row) return;

        const ROLE_ID = row.value;
        if (!member.roles.cache.has(ROLE_ID)) return;

        db.run(
          `INSERT OR REPLACE INTO roles (user_id, role_id) VALUES (?, ?)`,
          [member.id, ROLE_ID]
        );
      }
    );
  });
};



