const { MessageEmbed, Collection } = require('discord.js');
const noblox = require('noblox.js');

module.exports = {
  name: 'setgroup',
  usages: ['setgroup (Group Id)'],
  examples: ['setgroup 801730'],
  cooldown: 5,
  owners: true,
  args: true,
  async execute(message, args, client) { 
    
    const replys = client.replys;
    
    const db = client.database.guildsData;
    const data = await db.get(message.guild.id);
    
    await noblox.setCookie(data.system.cookies).then(async (user) => {
      if (args[0].toString() == data.system.group) return message.lineReplyNoMention(replys.already);
      await noblox.getGroup(args[0].toString()).then(async (group) => {
        if (user.UserID != group.owner.userId) return message.lineReplyNoMention(replys.noowner);
        data.system.group = args[0].toString();
        await db.update(message.guild.id, { system: data.system });
        message.lineReplyNoMention(replys.done);
      }).catch(async () => {
        message.lineReplyNoMention(replys.invalid);
      });
    }).catch(async () => {
      message.lineReplyNoMention(replys.nocookies);
    });
  }
}