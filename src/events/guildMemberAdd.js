const db = require("../database/database");

module.exports = (client) => {
  client.on("guildMemberAdd", member => {
    db.get(
      `SELECT role_id FROM roles WHERE user_id = ?`,
      [member.id],
      async (err, row) => {
        if (err || !row) return;

        const role = member.guild.roles.cache.get(row.role_id);
        if (!role) return;

        await member.roles.add(role);
      }
    );
  });
};


