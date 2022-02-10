const humanizeDuration = require("humanize-duration");

module.exports = {
  name: 'rep',
  usages: ['rep (User)'],
  examples: ['rep {userMention}', 'rep {userId}'],
  cooldown: 5,
  args: true,
  async execute(message, args, client) {
    
    const pub = client.publicReplys;
    const replys = client.replys;
    
    var user = client.users.cache.get(args[0].toUserId());
    if (!user) return message.lineReplyNoMention(pub.nouser);
    if (user.bot) return message.lineReplyNoMention(pub.bot);
    if (user.id == message.author.id) return message.lineReplyNoMention(replys.yourself);
    
    const db = client.database.usersData;
    const key = `${user.id}`;
    const data = await db.get(key);
    
    let cooldown = 86400000;
    if ((cooldown - (Date.now() - data.profile.now)) <= 0 || data.profile.now == "null") {
      data.profile.rep++;
      data.profile.now = Date.now();
      await db.update(key, { profile: data.profile }).then(() => {
        message.lineReplyNoMention(replys.done.replace(/\{user}/g, `${user.username}`));
      });
    } else {
      let time = cooldown - (Date.now() - data.profile.now);
      message.lineReplyNoMention(replys.invalid.replace(/\{time}/g, `${humanizeDuration(Number(time), { language: client.lang.toLowerCase(), round: true })}`))
    }
  }
}