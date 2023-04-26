const client = require("../../index.js");
const { EmbedBuilder } = require("discord.js");

const status = queue =>
  `Ses Yüksekliği: \`${queue.volume}%\` | Tekrar: \`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Tüm Kuyruk' : 'Bu şarkı') : 'Kapalı'
  }\` | Autoplay: \`${queue.autoplay ? 'Kapalı' : 'Açık'}\``
client.distube
  .on('playSong', (queue, song) =>
    queue.textChannel.send({
      embeds: [new EmbedBuilder().setColor("Green")
.setDescription(`
🎶 | Şarkı: \`${song.name}\` - \`${song.formattedDuration}\`
Şu kişi tarafından: ${song.user}
${status(queue)}`)]
    })
  )
  .on('addSong', (queue, song) =>
    queue.textChannel.send(
      {
        embeds: [new EmbedBuilder().setColor("Green")
          .setDescription(`🎶 | Eklendi ${song.name} - \`${song.formattedDuration}\` tarafından kuyruğa ${song.user}`)]
      }
    )
  )
  .on('addList', (queue, playlist) =>
    queue.textChannel.send(
      {
        embeds: [new EmbedBuilder().setColor("Green")
          .setDescription(`🎶 | Eklendi \`${playlist.name}\` çalma listesi (${playlist.songs.length
            } songs) to queue\n${status(queue)}`)]
      }
    )
  )
  .on('error', (channel, e) => {
    if (channel) channel.send(`❌ | Bir hatayla karşılaşıldı: ${e.toString().slice(0, 1974)}`)
    else console.error(e)
  })
  .on('empty', channel => channel.send({
    embeds: [new EmbedBuilder().setColor("Red")
      .setDescription('❌ | Ses kanalı boş! Kanaldan ayrılıyorum...')]
  }))
  .on('searchNoResult', (message, query) =>
    message.channel.send(
      {
        embeds: [new EmbedBuilder().setColor("Red")
          .setDescription('`❌ | Sonuç bulunamadı. \`${query}\`!`')]
      })
  )
  .on('finish', queue => queue.textChannel.send({
    embeds: [new EmbedBuilder().setColor("Green")
      .setDescription('🏁 | Şarkı kalmadı!')]


      
  }))