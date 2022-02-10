const { MessageEmbed, MessageAttachment, Collection } = require('discord.js');
const cooldown = new Collection();
const { createCanvas, loadImage } = require('canvas');
const noblox = require('noblox.js');
const { server } = require('../../src/config');

module.exports = {
  name: 'transfer',
  usages: ['transfer (Username) (Amount)'],
  examples: ['transfer MoMandoOo (10)'],
  cooldown: 5,
  dm: true,
  //args: true,
  async execute(message, args, client) { 
    
    if (!args[0]) {
      let embed = new MessageEmbed().setColor(client.color).setDescription(`${client.prefix}transfer (Username) (Amount)`);
      return message.channel.send(embed)
    } 

    
    const replys = client.replys;
    
    const db = client.database.usersData;
    const dbg = client.database.guildsData;
    const data = await db.get(message.author.id);
    //const guild = client.guilds.cache.get(data.profile.cloudServer);
   // if (!guild) return message.lineReplyNoMention(replys.noserver);
    const data2 = await dbg.get(server);
    
    const status = true;
    
    if(status === false) return message.lineReplyNoMention("** التحويل مقفل حاليا لـعدم وجود روبوكس في الجروب**")
    
    
    
    await noblox.getIdFromUsername(args[0].toString()).then(async (clientId) => {
      if (isNaN(args[1].toString()) || parseInt(args[1].toString()) != args[1].toString() || parseInt(args[1].toString()) < 1) return message.lineReplyNoMention('test');
      let coins = data.profile.coins;
      if (parseInt(args[1]) > coins) return message.lineReplyNoMention(replys.notenough);
      await noblox.setCookie(data2.system.cookies).then(async (user) => {
        await noblox.getGroup(data2.system.group).then(async (group) => {
          let clientGroups = [];
          await noblox.getGroups(clientId).then(async (groups) => {
            groups.forEach(async (group) => clientGroups.push(group.Id.toString()));
            if (!clientGroups.includes(data2.system.group)) return message.lineReplyNoMention(replys.notingroup.replace(/\{link}/g, `https://www.roblox.com/groups/${data2.system.group.toString()}`));
            let funds = await noblox.getGroupFunds(parseInt(data2.system.group));
            if (parseInt(args[1]) > parseInt(funds)) return message.lineReplyNoMention(replys.nohave);
            await noblox.groupPayout(parseInt(data2.system.group), parseInt(clientId), parseInt(args[1])).then(async () => {
              //let count = 0, end = parseInt(coins.length - parseInt(args[1]));
              data.profile.coins -= parseInt(args[1]);
              await db.update(message.author.id, { profile: data.profile });
              let thanksChannel = client.channels.cache.get(data2.system.thanksChannel.toString().toChannelId());
              let thanksMessage = "";
              if (thanksChannel) thanksMessage = "\n" + replys.thanksMessage.replace(/\{channel}/g, `<#${thanksChannel.id}>`);
              message.lineReplyNoMention(replys.done.replace(/\{robux}/g, `${data.profile.coins}`) + thanksMessage);
              let proofsChannel = client.channels.cache.get(data2.system.proofsChannel.toString().toChannelId());
              if (proofsChannel) {
                funds = await noblox.getGroupFunds(parseInt(data2.system.group));
                const numberP = args[1];
        const bla = funds;
        const username = args[0];
              let th = await noblox.getPlayerThumbnail(parseInt(clientId), "150x200", "jpeg", false, "Body").then(async(a) => {
                        let url = "";
                a.forEach(avatar => url = avatar.imageUrl);
                
       // const url = "https://media.discordapp.net/attachments/918074014616936449/918074662825656350/a2661248397_10.jpg";
        
                
        const canvas = createCanvas(991, 172);
        const ctx = canvas.getContext('2d')
        const background = await loadImage('https://cdn.discordapp.com/attachments/838151432040874075/838528172394938420/PicsArt_05-03-12.31.17.jpg');
        ctx.beginPath();
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.font = '15px impact';
        ctx.fillStyle = 'black';
        ctx.fillText(numberP.toLocaleString().toString(), 802.5, 42.4);
        ctx.font = "650 16px impact";
        ctx.fillText(numberP.toLocaleString().toString(), 864.5, 82.5);
        ctx.fillText(bla.toLocaleString(), 830.5, 105.7);
        ctx.font = "570 15.2px impact";
        ctx.fillText(username.toString(), 61, 35);
        ctx.closePath();
        const userImage = await loadImage(url.toString());
        ctx.drawImage(userImage, 11.5,16.5,35,35);
        ctx.beginPath();
        ctx.arc(29, 34, 21, 0, Math.PI * 2 , true);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 7;
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        const attach = new MessageAttachment(canvas.toBuffer(), 'payout.png');
                
                
                proofsChannel.send(replys.proofsMessage.replace(/\{user}/g, `<@${message.author.id}>`), {
                  files: [attach]
                });
              })
              }
            }).catch(async (e) => {
              console.error(e);
              message.lineReplyNoMention(replys.noweeks);
            }); 
          }).catch(async () => {
            //
          });
        }).catch(async () => {
          message.lineReplyNoMention(replys.lock);
        });
      }).catch(async () => {
        message.lineReplyNoMention(replys.lock);
      });
    }).catch(async () => {
      message.lineReplyNoMention(replys.notfound);
    });
  }
}