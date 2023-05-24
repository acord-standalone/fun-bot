const { Utils } = require("@mostfeatured/dbi");
const dbi = require("./dbi");
(async () => {
  await Utils.recursiveImport("./src");
  await dbi.load();
  await dbi.login();
  console.log(`Logged in! ${dbi.data.clients.first().client.user.tag} (${dbi.data.clients.first().client.user.id})`);
})();