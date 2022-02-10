const { languages } = require('../../src/config');

module.exports = {
  name: 'setlanguage',
  aliases: ['setlang'],
  usages: ['setlanguage (Language Code)'],
  examples: ['setlanguage ar'],
  cooldown: 5,
  admin: true,
  permissions: ["ADMINISTRATOR"],
  args: true,
  async execute(message, args, client) {
    
    const replys = client.replys;
    const db = client.database.guildsData;
    const key = `${message.guild.id}`;
    
    if ((!languages.includes(args[0].toLowerCase()) && !languages.includes(args[0].substr(0, 2).toLowerCase())) || args[0].length < 2) return message.lineReplyNoMention(replys.invalid.replace(/\{languages}/g, languages.slice(0, languages.length / 2).join(', ')));
    
    await db.update(key, {
      language: args[0].substr(0, 2).toLowerCase().toString()
    }).then(() => {
      message.lineReplyNoMention(replys.done);
    });
  }
}