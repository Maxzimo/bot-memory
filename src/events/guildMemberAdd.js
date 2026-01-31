const db = require("../database/database");
const { ROLE_ID } = require("../config/config");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    db.get(
      "SELECT * FROM saved_role WHERE user_id = ? AND guild_id = ?",
      [member.id, member.guild.id],
      async (err, row) => {
        if (!row) return;

        const role = member.guild.roles.cache.get(ROLE_ID);
        if (!role) return;

        await member.roles.add(role);

        db.run(
          "DELETE FROM saved_role WHERE user_id = ? AND guild_id = ?",
          [member.id, member.guild.id]
        );
      }
    );
  }
};
