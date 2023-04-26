const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');
const axios = require('axios')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lyrics')
    .setDescription('Şarkı sözlerini bulursunuz.')
    .addStringOption(option => option.setName('title').setDescription('Şarkının ismi').setRequired(true)),
  async execute(interaction) {
    const title = interaction.options.getString('title');

    const embed = new EmbedBuilder();
    await interaction.deferReply();

    await axios.get(`https://some-random-api.ml/lyrics?title=${title}`).then(async (data) => {
      embed
        .setColor('Green')
        .setTitle(`${data.data.title}`)

        .setThumbnail(data.data.thumbnail.genius)
        .setFooter({ text: `${data.data.author}` })
        .setDescription(`${data.data.lyrics.slice(0, 4096)}`);

      await interaction.editReply({ embeds: [embed] });
    }).catch(() => {
      embed
        .setColor('Red')
        .setDescription(`❌ Bu isimde şarkı bulunamadı.`);
      return interaction.editReply({ embeds: [embed], ephemeral: true });
    });
  },
};
