const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ping',
  usages: ['ping'],
  examples: ['ping'],
  cooldown: 10,
  async execute(message, args, client) {
    
    let now_time = Date.now();
    let msg = await message.lineReplyNoMention('> **🏓 Pong...**');
    
    msg.edit('',
      new MessageEmbed()
      .setColor(client.color)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`**📊 Time Taken: ${Date.now() - now_time} ms\n🌐 Web Socket: ${client.ws.ping} ms**`)
    );
  }
}