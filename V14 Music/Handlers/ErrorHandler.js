async function LoadErrorHandler(client) {
  const { loadFiles } = require("../Functions/fileLoader");
  const { EmbedBuilder, codeBlock } = require("discord.js");
  const { inspect } = require("util");
  require("colors");

  await client.errors.clear();

  const Files = await loadFiles("Error_Events");
  if (!Files) {
    throw new Error("[FOLDER_NOT_FOUND]".red + " Error_Events was not found");
  }
  console.log("Devam etmek")
  Files.forEach(async (files) => {
    const error = require(files);
    const ChannelID = "1099251720837673013"//CRUSH HATASI İÇİN BİLGİLENDİRME KANALI
    const Channel = await client.channels.fetch(ChannelID);
    if (!Channel) return;

    const Embed = new EmbedBuilder()
      .setColor("Random")
      .setTimestamp()
      .setFooter({ text: "⚠️Anti Crash Sistemi" })
      .setTitle("Karşılaşılan Hata/Uyarı");
    const execute = (err, p) =>
      error.execute(err, p, Embed, Channel, codeBlock, inspect, client, client);
    client.errors.set(error.name, execute);

    if (error.client) {
      client.on(error.name, execute);
    } else if (error.process) {
      process.on(error.name, execute);
    } else {
      return console.log("Geçerli bir hata türü değil");
    }
    console.log("ErrorHandler" + " · Loaded" + " " + error.name);
  });
}
module.exports = { LoadErrorHandler };