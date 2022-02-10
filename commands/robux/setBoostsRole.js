const { MessageEmbed, Collection } = require('discord.js');

module.exports = {
  name: 'setboostsrole',
  usages: ['setboostsrole (Role)'],
  examples: ['setboostsrole {roleMention}', 'setboostsrole {roleId}'],
  cooldown: 5,
  owners: true,
  args: true,
  async execute(message, args, client) { 
    
    const replys = client.replys;
    
    const db = client.database.guildsData;
    const data = await db.get(message.guild.id);
    
    let role = message.guild.roles.cache.find(r => r.id == args[0].toString().toRoleId());
    if (!role || role.name == "@everyone") return message.lineReplyNoMention(replys.invalid);
    if (role.id == data.system.boostsRole) return message.lineReplyNoMention(replys.already);
    data.system.boostsRole = role.id.toString();
    await db.update(message.guild.id, { system: data.system });
    message.lineReplyNoMention(replys.done);
  }
}