const { Utils } = require("@mostfeatured/dbi");
const dbi = require("./dbi");
(async () => {
  await Utils.recursiveImport("./src");
  await dbi.load();
  await dbi.publish("Guild", "1078486841688342568");
  await dbi.unload();
  console.log("Published!");
})();