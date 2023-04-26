const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const client = require("../../index");

module.exports = {
  premiumOnly: true,
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Şarkıyı geçersiniz."),
    async execute(interaction) {
        const { options, member, guild, channel } = interaction;

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

            const queue = await client.distube.getQueue(voiceChannel);

            if (!queue) {
                embed.setColor("Red").setDescription("Aktif kuyruk yok.");
                return interaction.reply({ embeds: [embed], ephemeral: true });
            }

            await queue.skip(voiceChannel);
            embed.setColor("Blue").setDescription("⏩ Şarkı atlandı.");
            return interaction.reply({ embeds: [embed], ephemeral: false });

        } catch (err) {
            console.log(err);

            embed.setColor("Red").setDescription("❌ | Bir şeyler yanlış gitti...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}