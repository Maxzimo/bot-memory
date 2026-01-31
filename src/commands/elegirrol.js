const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const db = require("../database/database");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("elegirrol")
    .setDescription("Elige el rol que se guardará al salir del servidor")
    .addRoleOption(option =>
      option
        .setName("rol")
        .setDescription("Rol a guardar y restaurar")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const role = interaction.options.getRole("rol");

    db.run(
      `INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)`,
      ["role_id", role.id],
      (err) => {
        if (err) {
          console.error(err);
          return interaction.reply({
            content: "❌ Error guardando el rol",
            ephemeral: true
          });
        }

        interaction.reply({
          content: `✅ Rol configurado correctamente: **${role.name}**`,
          ephemeral: true
        });
      }
    );
  }
};