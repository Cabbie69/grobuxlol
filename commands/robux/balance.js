const { MessageEmbed, Collection } = require('discord.js');
//const { server } = require('../../src/config');

module.exports = {
  name: 'balance',
  usages: ['balance'],
  examples: ['balance'],
  cooldown: 5,
  dm: true,
  async execute(message, args, client) { 
    
    const replys = client.replys;
    
    const db = client.database.usersData;
    const data = await db.get(message.author.id);
    //const guild = client.guilds.cache.get(server);
    //if (!guild) return;// message.lineReplyNoMention(replys.noserver);
    
    let coins = data.profile.coins;
    let embed = new MessageEmbed().setColor(client.color).setDescription(replys.done.replace(/\{coins}/g, `${coins}`));
    message.lineReplyNoMention('', { embed: embed });
  }
}