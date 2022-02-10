const { MessageEmbed, Collection } = require('discord.js');
const noblox = require('noblox.js');

module.exports = {
  name: 'deletecode',
  usages: ['deletecode (code)'],
  examples: ['deletecode boza'],
  cooldown: 5,
  owners: true,
  args: true,
  dm: true,
  async execute(message, args, client) { 
    var code = args[0];
    
    if(!code) return message.lineReplyNoMention('Please enter a code.');
    const replys = client.replys;
    
    const db = client.database.guildsData;
    const data = await db.get(message.guild.id);
    
    if (!data.system.giftsCode.map( e => e.code ).includes(code)) return message.lineReplyNoMention("**That code does not exist!**");
    console.log(data.system.giftsCode);
    data.system.giftsCode = data.system.giftsCode.filter(e => e.code !== code);

    await db.update(message.guild.id, { system: data.system });

    message.lineReplyNoMention("**This code has been deleted successfully!**");
    
    // await noblox.setCookie(data.system.cookies).then(async (user) => {
    //   if (args[0].toString() == data.system.group) return message.lineReplyNoMention(replys.already);
    //   await noblox.getGroup(args[0].toString()).then(async (group) => {
    //     if (user.UserID != group.owner.userId) return message.lineReplyNoMention(replys.noowner);
    //     data.system.group = args[0].toString();
    //     await db.update(message.guild.id, { system: data.system });
    //     message.lineReplyNoMention(replys.done);
    //   }).catch(async () => {
    //     message.lineReplyNoMention(replys.invalid);
    //   });
    // }).catch(async () => {
    //   message.lineReplyNoMention(replys.nocookies);
    // });
  }
}