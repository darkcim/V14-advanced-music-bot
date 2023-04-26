const { SlashCommandBuilder, PermissionFlagsBits, ActivityType, EmbedBuilder } = require('discord.js')

module.exports = {
  adminOnly: true,
  premiumOnly: false,
  data: new SlashCommandBuilder()
    .setName('update')
    .setDescription('Aktiviteyi değiştirebilirsin!')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand(subcommand =>
      subcommand.setName('activity')
        .setDescription('Bot durumunu güncelle')
        .addStringOption(option =>
          option.setName('type')
            .setDescription('Etkinliği seçin')
            .setRequired(true)
            .addChoices(
              { name: "Playing", value: "Playing" },
              { name: "Streaming", value: "Streaming" },
              { name: "Listening", value: "Listening" },
              { name: "Watching", value: "Watching" },
              { name: "Competing", value: "Competing" },
            )
        )
        .addStringOption(option =>
          option.setName('activity')
            .setDescription('Etkinliği seçin')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand.setName('status')
        .setDescription('Bot etkinliğini güncelle!')
        .addStringOption(option =>
          option.setName('type')
            .setDescription('Etkinliği seçin')
            .setRequired(true)
            .addChoices(
              { name: "Online", value: "online" },
              { name: "Idle", value: "idle" },
              { name: "No molestar", value: "dnd" },
              { name: "Invisible", value: "invisible" },
            )
        )
    ),

  async execute(interacion, client) {
    const { options } = interacion

    const sub = options.getSubcommand(["activity", "status"])
    const type = options.getString('type')
    const activity = options.getString('activity')
    try {
      switch (sub) {
        case 'activity':
          switch (type) {
            case "Playing":
              client.user.setActivity(activity, { type: ActivityType.Playing })
              break;
            case "Streaming":
              client.user.setActivity(activity, { type: ActivityType.Streaming })
              break;
            case "Listening":
              client.user.setActivity(activity, { type: ActivityType.Listening })
              break;
            case "Watching":
              client.user.setActivity(activity, { type: ActivityType.Watching })
              break;
            case "Competing":
              client.user.setActivity(activity, { type: ActivityType.Competing })
              break;
          }

        case 'status':
          client.user.setPresence({ status: type })
          break;
      }
    } catch (error) {
      console.log(error);
    }
    const embed = new EmbedBuilder()

    return interacion.reply({ embeds: [embed.setDescription(`Başarı ile ayalandı.`)] })
  }
};
