const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  const files = fs
    .readdirSync(__dirname)
    .filter(f => f !== "event.js" && f.endsWith(".js"));

  for (const file of files) {
    require(`./${file}`)(client);
  }
};
