const { SlashCommandBuilder, MessageFlags, PermissionFlagsBits } = require("discord.js");
const db = require("../database/database");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("elegirrol")
    .setDescription("Define el rol que se guardará y restaurará")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator) // 👈 ADMIN ONLY
    .addRoleOption(option =>
      option
        .setName("rol")
        .setDescription("Rol a guardar")
        .setRequired(true)
    ),

  async execute(interaction) {
    const role = interaction.options.getRole("rol");

    db.run(
      `INSERT OR REPLACE INTO config (key, value) VALUES ('role_id', ?)`,
      [role.id]
    );

    await interaction.reply({
    content: `✅ Rol configurado: ${role.name}`,
    flags: MessageFlags.Ephemeral
    });
  }
};

