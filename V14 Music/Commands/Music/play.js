const { ButtonBuilder, ActionRowBuilder, EmbedBuilder, SlashCommandBuilder, ButtonStyle } = require("discord.js");
const client = require("../../index");

module.exports = {
  premiumOnly: false,
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Şarkı açarsınız.")
    .addStringOption(option =>
      option.setName("şarkı")
        .setDescription("Şarkının adını veya url'sini sağlayın.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options, member, guild, channel } = interaction;

    const query = options.getString("şarkı");
    const voiceChannel = member.voice.channel;

    const embed = new EmbedBuilder();

    if (!voiceChannel) {
      embed.setColor("#ff0000").setDescription("Müzik komutlarını yürütmek için bir ses kanalında olmalısınız.");
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    if (!member.voice.channelId == guild.members.me.voice.channelId) {
      embed.setColor("#ff0000").setDescription(`Bot şuan başka kanalda kullanılıyor! <#${guild.members.me.voice.channelId}>`);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }

    try {

      client.distube.play(voiceChannel, query, { textChannel: channel, member: member });
      const message = await interaction.reply({
        content: "🎶 Şarkıyı açıyorum.",
      });

    } catch (err) {
      console.log(err);

      embed.setColor("#ff0000").setDescription("❌ | Bir şeyler yanlış gitti...");

      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  }
}
