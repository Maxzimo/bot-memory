const db = require("../database/database");
const { ROLE_ID } = require("../config/config");

module.exports = {
  name: "guildMemberRemove",
  async execute(member) {
    if (!member.roles.cache.has(ROLE_ID)) return;

    db.run(
      "INSERT OR IGNORE INTO saved_role (user_id, guild_id) VALUES (?, ?)",
      [member.id, member.guild.id]
    );
  }
};
