const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ChannelType,
  PermissionFlagsBits,
  resolveColor,
} = require("discord.js");

const { ViewChannel, SendMessages, ReadMessageHistory } = PermissionFlagsBits;
const { createTranscript } = require("discord-html-transcripts");

const suggestSchema = require("../../Models/SuggestChannel");
const suggestionSchema = require("../../Models/Suggestion");
const Dev = require("../../Models/Developer");

module.exports = {
  name: "interactionCreate",

  async execute(interaction, client) {
    const {
      customId,
      values,
      fields,
      member,
      user,
      guild,
      commandName,
      channel,
      guildId,
      message,
    } = interaction;

    const errEmbed = new EmbedBuilder().setColor("Red");

    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(commandName);
      if (command.moderatorOnly) {
        if (
          !member.roles.cache.has("1099272619565535282") //dev ekibi sw rolü
        ) {
          errEmbed.setDescription(
            "⛔ | Hay aksi! Bunun için izniniz yok!"
          );
          return interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
      }
      if (command.adminOnly) {
        if (
          !member.roles.cache.has("1099272619565535282") //dev ekibi sw rolü
        ) {
          errEmbed.setDescription(
            "⛔ | Hay aksi! Bunun için izniniz yok!"
          );
          return interaction.reply({ embeds: [errEmbed], ephemeral: true });
        }
      }

      if (!command) {
        return interaction.reply({
          content: "eski komut",
          ephemeral: true,
        });
      }

      command.execute(interaction, client);
    }
    if (interaction.isModalSubmit()) {
      if (customId == "developerModal") {
        const channel = await client.channels.cache.get("1099270561965813780"); //log kanals
        if (!channel) return console.log("geliştirici uygulamaları için ayarlanan kanal yok.");
        const a =
          interaction.fields.getTextInputValue("usernameBuilder") || undefined;
        const b =
          interaction.fields.getTextInputValue("wwydBuilder") || undefined;
        const c = interaction.fields.getTextInputValue("abty") || undefined;
        const d =
          interaction.fields.getTextInputValue("socialsBuilder") || undefined;
        const e =
          interaction.fields.getTextInputValue("yoeBuilder") || undefined;

        interaction.reply({
          content: `Geliştirici başvurusu için başvuruldu.`,
          ephemeral: true,
        });

  
      }}}}