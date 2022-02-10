const { MessageEmbed, Collection } = require('discord.js');
const noblox = require('noblox.js');

module.exports = {
  name: 'addcode',
  usages: ['addcode (code) (limit) (amount)'],
  examples: ['addcode boza 10 20'],
  cooldown: 5,
  owners: true,
  args: true,
  dm: true,
  async execute(message, args, client) { 
    var code = args[0];
    var limitUsers = args[1];
    var gifted = args[2];

    if(!code) return message.lineReplyNoMention('Please enter a code.');
    if(!limitUsers) return message.lineReplyNoMention('Please enter a limit.');
    if(!gifted) return message.lineReplyNoMention('Please enter a gifted robux.');

    if (isNaN(limitUsers)) return message.lineReplyNoMention('Limit users must be number');
    if (isNaN(gifted)) return message.lineReplyNoMention('Gifted robux must be number');

    const replys = client.replys;
    
    const db = client.database.guildsData;
    const data = await db.get(message.guild.id);
    
    if (data.system.giftsCode.map( e => e.code ).includes(code)) return message.lineReplyNoMention("**That code already added!**");
    console.log(data.system.giftsCode);
    data.system.giftsCode.push({
      guild: message.guild.id,
      code: args[0],
      limit: parseInt(args[1]),
      gifted: parseInt(args[2]),
      usagedBy: [ 'none-one' ]
    });

    await db.update(message.guild.id, { system: data.system });

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Robux Code Added')
      .setDescription(`Robux Code: ${args[0]}`)
      .addField('Limit', args[1])
      .addField('Gifted Robux', args[2])
      .setTimestamp()
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`);

    message.lineReplyNoMention(embed);
    
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