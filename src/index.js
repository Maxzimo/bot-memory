const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();

/* 🔹 CARGAR COMANDOS */
const commandFiles = fs.readdirSync("./src/commands").filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

/* 🔹 CARGAR EVENTOS */
const eventFiles = fs.readdirSync("./src/events").filter(f => f.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  event(client);
}

/* 🔹 MANEJAR SLASH COMMANDS (ESTO ES LO QUE FALTABA) */
client.on("interactionCreate", async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) return;
    await interaction.reply({ content: "❌ Error ejecutando el comando", ephemeral: true });
  }
});

/* 🔹 READY */
client.once("clientReady", () => {
  console.log(`🤖 Bot conectado como ${client.user.tag}`);
});

client.login(process.env.TOKEN);
 

