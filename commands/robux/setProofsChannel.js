const { MessageEmbed, Collection } = require('discord.js');

module.exports = {
  name: 'setproofschannel',
  usages: ['setproofschannel (Channel)'],
  examples: ['setproofschannel {channelMention}', 'setproofschannel {channelId}'],
  cooldown: 5,
  owners: true,
  args: true,
  async execute(message, args, client) { 
    
    const replys = client.replys;
    
    const db = client.database.guildsData;
    const data = await db.get(message.guild.id);
    
    let channel = client.channels.cache.get(args[0].toString().toChannelId());
    if (!channel || channel.type != "text") return message.lineReplyNoMention(replys.invalid);
    if (channel.id == data.system.proofsChannel) return message.lineReplyNoMention(replys.already);
    data.system.proofsChannel = channel.id.toString();
    await db.update(message.guild.id, { system: data.system });
    message.lineReplyNoMention(replys.done);
  }
}