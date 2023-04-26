const { ActivityType } = require('discord.js');
const mongoose = require('mongoose');
const config = require("../../config.json");
require("colors");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await mongoose.connect(config.mongodb || 'mongodb://127.0.0.1:27017', {
      keepAlive: true,
    });

    if (mongoose.connect) {
      console.log('✅'.green + ' MongoDB bağlantısı başarılı!')
    }

    const activities = ["/play", "/help","🍋 Limon Music"];
    let i = 0;

    setInterval(() => client.user.setPresence({ activities: [{ name: activities[i++ % activities.length], type: ActivityType.Watching }] }), 15000);
    console.log(`[AKTİF]`.green + ` ${client.user.tag} ve ${client.guilds.cache.size} sunucu! `);
  },
};