const { EmbedBuilder } = require('@discordjs/builders')

const { Client, SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js')

module.exports = {

  data: new SlashCommandBuilder()

    .setName("uptime")

    .setDescription("Botun aktiflik süresi!"),

  async execute(interaction, client) {

    let totalSeconds = (client.uptime / 1000);

    let days = Math.floor(totalSeconds / 86400);

    totalSeconds %= 86400;

    let hours = Math.floor(totalSeconds / 3600);

    totalSeconds %= 3600;

    let minutes = Math.floor(totalSeconds / 60);

    let seconds = Math.floor(totalSeconds % 60);

    let uptime = `${days} Gün, ${hours} saat, ${minutes} dakika , ${seconds} saniye`;

    const embed = new EmbedBuilder()
      .setColor(0xb9127a)

      .setDescription(`\`\`\`+ Status : Online\n+ ${uptime}\`\`\``)

    await interaction.reply({ embeds: [embed] });

  }

}