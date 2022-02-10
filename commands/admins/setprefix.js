module.exports = {
  name: 'setprefix',
  usages: ['setprefix', 'setprefix (Prefix)'],
  examples: ['setprefix', 'setprefix $'],
  cooldown: 5,
  admin: true,
  permissions: ["ADMINISTRATOR"],
  async execute(message, args, client) {
    
    const replys = client.replys;
    const prefix = args[0] || client.prefix;
    const db = client.database.guildsData;
    const key = `${message.guild.id}`;
    
    await db.update(key, {
      prefix: prefix.toString()
    }).then(() => {
      if (args[0]) message.lineReplyNoMention(replys.done);
      else message.lineReplyNoMention(replys.reset);
    });
  }
}