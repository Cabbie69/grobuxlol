const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'stats',
  usages: ['stats'],
  examples: ['stats'],
  owners: true,
  async execute(message, args, client) {
    
    message.lineReplyNoMention(
      new MessageEmbed()
      .setColor(client.color)
      .setDescription(`**Total Servers \`${client.guilds.cache.size}\`\nTotal Users \`${client.users.cache.size}\`**`)
      .setTimestamp()
    );
  }
}