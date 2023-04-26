const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  Client,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  CoolDown: true,
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Botu davet et!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const link = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1110517509238&scope=bot%20applications.commands`;
    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setURL(link)
        .setLabel("Invite Me")
        .setStyle(ButtonStyle.Link)
    );
    const invite = new EmbedBuilder()
      .setAuthor({ name: `${client.user.tag}` })
      .setDescription(`*Beni davet etmek için aşağıdaki butona tıklayın!*`)
      .setThumbnail("https://cdn.discordapp.com/attachments/1028538200425246733/1063166826768506991/61vI32zUXaL.png")
      .setColor("Random");

    interaction.reply({
      embeds: [invite],
      components: [buttons],
      ephemeral: false,
    });
  },
};
