const {
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = {
  premiumOnly: false,
  data: new SlashCommandBuilder()
    .setName("help")

    .setDescription("Botun komutlarını görüntüleyin!"),
  async execute(interaction) {

    const { client } = interaction;

    const emojis = {
      info: "<a:gaming_bongo_cat:1082731813459476550>",
      developer: "<a:NO_check:1082727435474325525>",
      music: "<a:DP_amatcha_musicjam94:1091031672813793363>",
    };

    function getCommand(name) {
      const getCommandID = client.application.commands.cache
        .filter((cmd) => cmd.name === name) // Komut adına göre filtrele
        .map((cmd) => cmd.id); 
      return getCommandID;
    }

    const directories = [
      ...new Set(client.commands.map((cmd) => cmd.folder)),
    ];

    const formatString = (str) =>
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

    const categories = directories.map((dir) => {
      const getCommands = client.commands
        .filter((cmd) => cmd.folder === dir)
        .map((cmd) => {
          return {
            name: cmd.data.name,
            description:
              cmd.data.description ||
              "Bu komut için açıklama yok.",
          };
        });

      return {
        directory: formatString(dir),
        commands: getCommands,
      };
    });

    const embed = new EmbedBuilder()
      .setDescription("Aşağıdan bir kategori seçerek komut listelerini görün!")
      .setImage(`https://media.discordapp.net/attachments/1091125302765289573/1091855055042388080/x7MHJvl_2.png`)
      .setColor("#e72c4f")
      .setAuthor({ name: `${client.user.username}'s Commands`, iconURL: client.user.avatarURL() });

    const components = (state) => [
      new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("help-menu")

          .setPlaceholder("Menüden Seçim Yapınız!")
          .setDisabled(state)
          .addOptions(
            categories.map((cmd) => {
              return {
                label: cmd.directory,
                value: cmd.directory.toLowerCase(),
                description: `${cmd.directory} katagori komutları.`,
                emoji: emojis[cmd.directory.toLowerCase() || null],
              };
            })
          )
      ),
    ];

    const initialMessage = await interaction.reply({
      embeds: [embed],
      components: components(false),
    });

    const filter = (interaction) =>
      interaction.user.id === interaction.member.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: ComponentType.StringSelect,
    });

    collector.on("collect", (interaction) => {
      const [directory] = interaction.values;
      const category = categories.find(
        (x) => x.directory.toLowerCase() === directory
      );

      const categoryEmbed = new EmbedBuilder()
        .setTitle(`${emojis[directory.toLowerCase() || null]}  ${formatString(directory)} Komut`)
        .setImage(`https://media.discordapp.net/attachments/1091125302765289573/1091860821300215899/x7MHJvl_3.png`)
        .setDescription(
          `Altında kategorize edilen tüm komutların bir listesi ${directory}.`
        )
        .setColor("#e72c4f")
        .addFields(
          category.commands.map((cmd) => {
            return {
              name: `</${cmd.name}:${getCommand(cmd.name)}>`,
              value: `\`${cmd.description}\``,
              inline: true,
            };
          })
        );

      interaction.update({ embeds: [categoryEmbed] });
    });

    collector.on("end", () => {
      initialMessage.edit({ components: components(true) });
    });
  },
};