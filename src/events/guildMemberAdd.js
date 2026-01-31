const db = require("../database/database");

module.exports = (client) => {
  client.on("guildMemberAdd", async (member) => {
    db.get(
      `SELECT role_id FROM roles WHERE user_id = ?`,
      [member.id],
      async (err, row) => {
        if (err || !row) return;

        const role = member.guild.roles.cache.get(row.role_id);
        if (!role) return;

        try {
          await member.roles.add(role);
          console.log(`♻️ Rol restaurado a ${member.user.tag}`);

          db.run(`DELETE FROM roles WHERE user_id = ?`, [member.id]);
        } catch (e) {
          console.error("Error restaurando rol:", e);
        }
      }
    );
  });
};

