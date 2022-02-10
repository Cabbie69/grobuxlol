const { MessageEmbed, Collection } = require('discord.js');

module.exports = {
  name: 'setowner',
  usages: ['setowner (User)'],
  examples: ['setowner {userMention}', 'setowner {userId}'],
  cooldown: 5,
  owners: true,
  args: true,
  async execute(message, args, client) { 
    
    const replys = client.replys;
    const pub = client.publicReplys;
    
    const db = client.database.guildsData;
    const data = await db.get(message.guild.id);
    
    let user = client.users.cache.get(args[0].toString().toUserId());
    if (!user) return message.lineReplyNoMention(pub.nouser);
    if (user.bot) return message.lineReplyNoMention(pub.bot);
    if (user.id == data.system.owner) return message.lineReplyNoMention(replys.already);
    data.system.owner = user.id.toString();
    await db.update(message.guild.id, { system: data.system });
    message.lineReplyNoMention(replys.done.replace(/\{user}/g, `${user.tag}`));
  }
}