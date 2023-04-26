const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isButton()) return;

    const button = client.buttons.get(interaction.customId);

    if (!button) return;

    if (button == undefined) return;

    if (button.cooldown) {
      //Cooldown check
      const currentMemberCooldown = client.cooldowns.get(`${interaction.user.id}-button-${interaction.customId}`);
      if (!currentMemberCooldown) client.cooldowns.set(`${interaction.user.id}-button-${interaction.customId}`, (Date.now() + button.cooldown).toString());
      else if (parseInt(currentMemberCooldown) < Date.now()) client.cooldowns.set(`${interaction.user.id}-button-${interaction.customId}`, (Date.now() + button.cooldown).toString());
      else
        return interaction.reply({
          embeds: [new EmbedBuilder().setColor("Blurple").setDescription(`Yavaş olun ve **<t:${Math.floor(parseInt(currentMemberCooldown) / 1000)}:R> saniye** sonra tekrar deneyin.`)],
          ephemeral: true,
        });
    }

    if (
      button.permission &&
      !interaction.member.permissions.has(button.permission)
    )
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `Bunu kullanmak için gerekli izinlere sahip değilsiniz.`
            )
            .setColor("#f8312f"),
        ],
        ephemeral: true,
      });

    if (button.developer && interaction.user.id !== "632208307360235520")//kendi id ni gir knk
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`Bu buton yalnızca geliştiriciler içindir.`)
            .setColor("#f8312f"),
        ],
        ephemeral: true,
      });

    button.execute(interaction, client);
  },
};
