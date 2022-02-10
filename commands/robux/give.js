const { MessageEmbed, Collection } = require('discord.js');

module.exports = {
  name: 'give',
  usages: ['give (User) (Amount)'],
  examples: ['give {userMention} 10', 'give {userId} 25'],
  cooldown: 5,
  owners: true,
  args: true,
  async execute(message, args, client) { 
    
    const replys = client.replys;
    const pub = client.publicReplys;
    
    const db = client.database.usersData;
    
    let user = client.users.cache.get(args[0].toString().toUserId());
    if (!user) return message.lineReplyNoMention(pub.nouser);
    if (user.bot) return message.lineReplyNoMention(pub.bot);
    if (!args[1]) return message.lineReplyNoMention(replys.noamount);
    if (isNaN(args[1].toString()) || parseInt(args[1].toString()) != args[1].toString() || parseInt(args[1].toString()) < 1) return message.lineReplyNoMention(replys.invalid);
    const data = await db.get(user.id);
    //for (let i=0;i<parseInt(args[1]);i++) {
      data.profile.coins += parseInt(args[1]);//.push({ server: message.guild.id });
  //}
    await db.update(user.id, { profile: data.profile });
    let coins = data.profile.coins;
    message.lineReplyNoMention(replys.done.replace(/\{robux}/g, `${parseInt(coins)}`).replace(/\{user}/g, `${user.toString()}`));
  }
}