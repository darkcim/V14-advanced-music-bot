const { SlashCommandBuilder, EmbedBuilder, Client } = require('discord.js')
const { loadCommands } = require('../../Handlers/commandHandler')
const { loadEvents } = require('../../Handlers/eventHandler')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Komutlarınızı veya eventleri yeniden yükleyin!')
    .addSubcommand(subcommand =>
      subcommand.setName('events')
        .setDescription('Eventleri yeniden yükleyin!')
    )
    .addSubcommand(subcommand =>
      subcommand.setName('commands')
        .setDescription('Komutları yeniden yükleyin!')
    ),

  async execute(interaction, client) {
    const { user } = interaction
//gir kendi ıd ni kanka
    if (user.id !== '632208307360235520') return interaction.reply({ embeds: [new EmbedBuilder().setColor('Random').setDescription('❌ Bu komut yalnızca bot geliştiricisi içindir.')], ephemeral: true })
    const sub = interaction.options.getSubcommand()
    const embed = new EmbedBuilder()
      .setTitle('Developer')
      .setColor('Blue')

    switch (sub) {
      case 'commands':
        loadCommands(client)
        interaction.reply({ embeds: [embed.setDescription('Commands Reloaded!')] })
        console.log(`${user} komutları yeniden yükledi ✅`);
        break;
      case 'events':
        loadEvents(client)
        interaction.reply({ embeds: [embed.setDescription('Events Reloaded!')] })
        console.log(`${user} olayları yeniden yükledi ✅`);
        break;
    }
  }


};
