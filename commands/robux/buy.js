const { MessageEmbed, MessageAttachment, Collection } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');

module.exports = {
  name: 'buy',
  usages: ['buy (Amount)'],
  examples: ['buy 25'],
  cooldown: 5,
  args: true,
  async execute(message, args, client) {
    const cooldown = client.buyCooldown;
    const replys = client.replys;
    if(!message.channel.name.startsWith("ticket")) return;
    if (isNaN(args[0]) || args[0] <= 0 || parseInt(args[0]) != args[0]) return message.lineReplyNoMention(replys.nan);
    let key = `${message.guild.id}${message.author.id}`;
    if (cooldown.has(key)) return message.lineReplyNoMention(replys.already).then(msg => {
      msg.delete({ timeout: 2500 });
      message.delete({ timeout: 2500 });
    });
    else cooldown.set(key, true);
    
    const db = client.database.usersData;
    const data = await db.get(message.author.id);
    const dbg = client.database.guildsData;
    const data2 = await dbg.get(message.guild.id);
    
    if (parseInt(args[0].toString()) < data2.system.limit) {
      if (cooldown.has(key)) cooldown.delete(key);
      return message.lineReplyNoMention(replys.limit.replace(/\{limit}/g, `${data2.system.limit}`));
    }
    let owner = client.users.cache.get(data2.system.owner) || message.guild.owner.user;
    let price = parseInt(parseInt(args[0]) * data2.system.price);
    let boostRole = message.guild.roles.cache.find(r => r.id == data2.system.boostsRole.toString().toRoleId());
    if (boostRole) {
      if (message.guild.member(message.author.id).roles.cache.has(boostRole.id)) {
        price = Math.floor(price - price * (parseInt(data2.system.discount) / 100));
      }
    }
    price = Math.floor(price * 20 / 19) + 1;
    let embed = new MessageEmbed().setColor(client.color).setDescription(replys.transfer.replace(/\{price}/g, `${price}`).replace(/\{owner}/g, `<@601567058437603328>`).replace(/\{id}/g, `601567058437603328`));
    var msg = await message.lineReplyNoMention('', { embed: embed });
    price = Math.floor(price - price * (5 / 100));
    if (price <= 0) price = 1;
    
    let pay = await message.channel.createMessageCollector(user => (user.author.id == `282859044593598464` || user.author.id == `567703512763334685`) && (user.content.includes(message.author.username) && user.content.includes(`${price}`) && (user.content.includes(`<@!601567058437603328>`) || user.content.includes(`<@809147222305800203>`))), { time: 60000 * 2 });
    
    pay.once("collect", async () => {
      if (!cooldown.has(key)) return;
      //for (let i = 0;i < parseInt(args[0]); i++) {
        data.profile.coins += parseInt(args[0]);//({ server: message.guild.id });
      //}
      await db.update(message.author.id, { profile: data.profile }).then(async() => {
        // message.lineReplyNoMention(replys.done);
        
        let clientsRole = message.guild.roles.cache.find(r => r.id == data2.system.clientsRole.toString().toRoleId());
        if (clientsRole) {
          message.guild.member(message.author).roles.add(clientsRole);
        }
        message.reply(replys.twillclose, new MessageEmbed().setColor(client.color).setDescription(replys.done.replace('{amount}', data.profile.coins || 'null')));
        
        setTimeout(() => message.channel.delete(), 10 * 1000);
        
        message.author.send(
          new MessageEmbed()
          .setColor(client.color)
          .setDescription(replys.rsedrsala.replace(`{amount}`, parseInt(args[0])))
        );
        
        msg.delete();
      });
      cooldown.delete(key);
      pay.stop();
    });
    
    pay.once("end", async () => {
      if (cooldown.has(key)) {
        message.lineReplyNoMention(replys.timeout);
        msg.delete(); 
        cooldown.delete(key);
      }
    });
    
  }
}