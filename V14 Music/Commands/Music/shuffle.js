const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const client = require("../../index");

module.exports = {
  premiumOnly: true,
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Geçerli oynatma listesini karıştır."),
    async execute(interaction) {
        const { member, guild } = interaction;
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

            await queue.shuffle();
            embed.setColor("Purple").setDescription(`🎶 Sıradaki şarkılar karıştı.`);
            return interaction.reply({ embeds: [embed], ephemeral: false });

        } catch (err) {
            console.log(err);

            embed.setColor("Red").setDescription("❌ | Bir şeyler yanlış gitti...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}