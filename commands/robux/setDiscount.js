const { MessageEmbed, Collection } = require('discord.js');

module.exports = {
  name: 'setdiscount',
  usages: ['setdiscount (Discount)'],
  examples: ['setdiscount 30'],
  cooldown: 5,
  owners: true,
  args: true,
  async execute(message, args, client) { 
    
    const replys = client.replys;
    
    const db = client.database.guildsData;
    const data = await db.get(message.guild.id);
    
    if (isNaN(args[0].toString()) || parseInt(args[0].toString()) != args[0].toString() || parseInt(args[0].toString()) < 1) return message.lineReplyNoMention(replys.invalid);
    if (args[0].toString() == data.system.discount) return message.lineReplyNoMention(replys.already);
    data.system.discount = args[0].toString();
    await db.update(message.guild.id, { system: data.system });
    message.lineReplyNoMention(replys.done);
  }
}