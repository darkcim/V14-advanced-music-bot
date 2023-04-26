const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const client = require("../../index");

module.exports = {
  premiumOnly: true,
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Şarkı tekrarı.")
        .addStringOption(option =>
            option.setName("options")
                .setDescription("Döngü seçenekleri: kapalı, şarkı, kuyruk")
                .addChoices(
                    { name: "kapalı", value: "kapalı" },
                    { name: "şarkı", value: "şarkı" },
                    { name: "kuyruk", value: "kuyruk" },
                )
                .setRequired(true)
        ),
    async execute(interaction) {
        const { member, options, guild } = interaction;
        const option = options.getString("options");
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

            let mode = null;

            switch (option) {
                case "kapalı":
                    mode = 0;
                    break;
                case "şarkı":
                    mode = 1;
                    break;
                case "kuyruk":
                    mode = 2;
                    break;
            }

            mode = await queue.setRepeatMode(mode);

            mode = mode ? (mode === 2 ? "Kuyruk tekrarı" : "Şarkı tekrarı") : "Kapalı";

            embed.setColor("Orange").setDescription(`🔁 Tekrar modunu:: \`${mode}\`.`);
            return interaction.reply({ embeds: [embed], ephemeral: false });
        } catch (err) {
            console.log(err);

            embed.setColor("Red").setDescription("❌ | Bir şeyler yanlış gitti...");

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

    }
}