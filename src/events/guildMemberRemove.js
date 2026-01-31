module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
    console.log(`👋 Entró ${member.user.tag}`);
  });
};

