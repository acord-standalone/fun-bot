require("dotenv").config();

const { createDBI } = require("@mostfeatured/dbi");
let dbi = createDBI("fun", {
  strict: true,
  discord: {
    token: process.env.DISCORD_TOKEN,
    options: {
      intents: [
        "Guilds"
      ]
    }
  },
  defaults: {
    locale: "en",
    defaultMemberPermissions: ["SendMessages"],
    directMessages: false
  },
  references: {
    autoClear: {
      ttl: 60 * 1000 * 60,
      check: 60 * 1000
    }
  }
});
module.exports = dbi;