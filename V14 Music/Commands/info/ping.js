// make sure to be happy in your life djs nerd

const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require('ms');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Botun pingini görüntüleyin!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  async execute(interaction) {
    const { client, inter } = interaction;
    const pinged = new EmbedBuilder()
      .setColor("White")
      .setDescription(`Pong! API gecikmesi : **${Math.round(client.ws.ping)} ms** 🛰️ , Son kalp atışı az önce hesaplandı **${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })}**`)
      .setTimestamp();

    interaction.reply({ embeds: [pinged] });

  },
};