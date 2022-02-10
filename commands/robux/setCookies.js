const { MessageEmbed, Collection } = require('discord.js');
const noblox = require('noblox.js');

module.exports = {
  name: 'setcookies',
  webGuildID: '',
  usages: ['setcookies (Account Cookies)'],
  examples: ['setcookies _|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_BE66CB19FDADC92E0AA8029BC584A1AEF4AE4F4D98D40C853D3061873222A69H4ZFD6B7CCB2A0999F17E7CC2939D5F0E774CDD4E72E776F7DEB13BAE0F61A49FE8A83629E490753B3802C089KP9B69E2228F71EF11CDB37AA6F30BE3BA082AA715FE86F79C657FA4F1A7CB33F3E639FAFFD56CD0F7E0331FDF79CD0D35135E4CECE59AE8A869CC4BD0E0F26F0FA9246E74E075DCB94079092E0E03A390428DF525D25623EE02CC52281513C7865C7CB244D23EB61DE2C439A32CAFEB6348C62F0E4485879C5C388B1E8A7579C740A57FA08DAB9D9D827D80DB289FCEE5FD7AF709BC20E8229C5C82A8429CB34F93C1C70F63CFFB18BB4BBCCC18EBAFEB7FB5DF03DD45E1CAB039853E81E3281DC645CB91D6505430493EE33043ACA5DAF28E76810ED3518AE45DDFDBF0EB508EF64971556A582193D0C7766BFFD42378B52391415F59BD7C6CE7E12417120800B327EF4D763658'],
  cooldown: 5,
  owners: true,
  args: true,
  async execute(message, args, client) { 
    
    const replys = client.replys;
    
    const db = client.database.guildsData;
    const data = await db.get(message.guild.id);
    
    if (args[0].toString() == data.system.cookies) return message.lineReplyNoMention(replys.already).then(() => message.delete());
    noblox.setCookie(args[0].toString()).then(async () => {
      data.system.cookies = args[0].toString();
      data.system.group = "";
      await db.update(message.guild.id, { system: data.system });
      message.lineReplyNoMention(replys.done).then(() => message.delete());
    }).catch(async () => {
      message.lineReplyNoMention(replys.invalid);
    });
  }
}