const { MessageEmbed, Collection } = require('discord.js');
const noblox = require('noblox.js');

module.exports = {
  name: 'stock',
  usages: ['stock'],
  examples: ['stock'],
  cooldown: 5,
  owners: true,
  async execute(message, args, client) { 
    
    const replys = client.replys;
    
    const db = client.database.guildsData;
    const data = await db.get(message.guild.id);
    
    await noblox.setCookie(data.system.cookies).then(async (user) => {
      await noblox.getGroup(data.system.group).then(async (group) => {
        let funds = await noblox.getGroupFunds(parseInt(data.system.group));
        let embed = new MessageEmbed().setColor(client.color).setDescription(replys.done.replace(/\{funds}/g, `${funds}`));
        message.lineReplyNoMention('', { embed: embed });
      }).catch(async () => {
        message.lineReplyNoMention(replys.nogroup);
      });
    }).catch(async () => {
      message.lineReplyNoMention(replys.nocookies);
    });
  }
}