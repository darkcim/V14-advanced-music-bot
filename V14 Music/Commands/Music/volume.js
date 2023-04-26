const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const client = require("../../index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Şarkı sesini ayarlarsın.")
    .addIntegerOption(option =>
      option.setName("volume")
        .setDescription("10 = 10%")
        .setMinValue(0)
        .setMaxValue(100)
        .setRequired(true)
    ),
  async execute(interaction) {
    const { member, guild, options } = interaction;
    const volume = options.getInteger("volume");
    const voiceChannel = member.voice.channel;

    const embed = new EmbedBuilder();

    if (!voiceChannel) {
      embed.setColor("Red").setDescription("Müzik komutlarını yürütmek için bir ses kanalında olmalısınız.");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (!member.voice.channelId == guild.members.me.voice.channelId) {
      embed.setColor("Red").setDescription(`Bot şuan başka kanalda kullanılıyor! <#${guild.members.me.voice.channelId}>`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    try {

      client.distube.setVolume(voiceChannel, volume);
      return interaction.reply({ content: `🔉 Ses şu şekilde ayarlandı: ${volume}%.` });

    } catch (err) {
      console.log(err);

      embed.setColor("Red").setDescription("❌ | Bir şeyler yanlış gitti...");

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  }
}