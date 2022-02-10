const { MessageEmbed, MessageAttachment } = require("discord.js");
const { createCanvas, loadImage } = require("canvas");
const { owners } = require('../../src/config');

module.exports = {
  name: 'profile',
  usages: ['profile', 'profile (User)'],
  examples: ['profile', 'profile {userMention}', 'profile {userId}'],
  async execute(message, args, client) {
    
    const pub = client.publicReplys;
    var user = message.author;
    if (args[0]) user = client.users.cache.get(args[0].toUserId());
    if (!user) return message.lineReplyNoMention(pub.nouser);
    if (user.bot) return message.lineReplyNoMention(pub.bot);
    
    const db = client.database.usersData;
    const data = await db.get(user.id);
    
    const title = data.profile.title;
    const level = data.profile.level;
    const rep = data.profile.rep;
    const coins = data.profile.coins;
    const xp = data.profile.xp;
    //coins.shift();
    //coins = coins.filter(e => e.server == message.guild.id).length;
    
    const canvas = createCanvas(608, 608);
    const ctx = canvas.getContext("2d");
    const image = "https://cdn.discordapp.com/attachments/884953629465923674/921888057198792704/download.jpg";
    const background = await loadImage(image);
    let badges = [
      "https://cdn.discordapp.com/attachments/884953629465923674/921888057198792704/download.jpg",
      "https://cdn.discordapp.com/attachments/884953629465923674/921888057198792704/download.jpg",
      "https://cdn.discordapp.com/attachments/884953629465923674/921888057198792704/download.jpg",
      "https://cdn.discordapp.com/attachments/884953629465923674/921888057198792704/download.jpg"
    ];
    badges = [badges[0]];
    
    /* --------- */
    let sizeX = 165;
    let sizeY = sizeX;
    let z = 110;
    let x = z - sizeX / 2;
    let y = z - sizeY / 2;
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    const avatar = await loadImage(user.displayAvatarURL({ format: "jpg" }));
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "bold 40px Arial";
    ctx.fillText(user.username, 350, 125);
    ctx.font = "bold 25px arial";
    ctx.fillText(`${title}`, 350, 250);
    /* -------------- */
    let a = 120,
        b = 220,
        c = 320,
        d = 420,
        ft = 35;
    ctx.textAlign = "left";
    ctx.font = "23px arial";
    ctx.fillStyle = "#dddddd";
    ctx.fillText("LVL", 30, z + a);
    ctx.fillText("REP", 30, z + b);
    ctx.fillText("ROBUX", 30, z + c);
    ctx.fillText("XP", 30, z + d);
    ctx.fillStyle = "#E0E0E0";
    ctx.font = "bold 33px Arial";
    ctx.fillText(`${level}`, 30, z + a + ft);
    ctx.fillText(`+${rep}`, 30, z + b + ft);
    ctx.fillText(`${coins}`, 30, z + c + ft);
    ctx.fillText(`${xp}`, 30, z + d + ft);
    /* -------------- */
    ctx.beginPath();
    ctx.arc(z, z, sizeY / 2, 0, 2 * Math.PI);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
    ctx.save();
    ctx.clip();
    ctx.drawImage(avatar, x, y, sizeX, sizeY);
    ctx.restore();
    
    /* ------------ Badges ----------- */
    let u = 40;
    sizeX = 50;
    sizeY = sizeX;

    if (badges[0]) {
      let badge1 = await loadImage(badges[0]);
      let vs = badges[1] ? 304 - u : 304;
      let xsiz = badges[2] ? vs : vs - u / 2 + sizeX / 2;
      let ysiz = 400;
      x = xsiz - sizeX / 2;
      y = ysiz - sizeY / 2;

      ctx.beginPath();
      ctx.arc(xsiz, ysiz, sizeY / 2, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.save();
      ctx.clip();
      if (owners.includes(user.id)) {
        ctx.drawImage(badge1, x, y, sizeX, sizeY);
      }
      ctx.restore();
  }
    const attach = new MessageAttachment(canvas.toBuffer(), "profile.png");
    message.lineReplyNoMention(attach);
  }
}