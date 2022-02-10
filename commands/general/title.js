module.exports = {
  name: 'title',
  usages: ['title', 'title (Title)'],
  examples: ['title', 'title Hello world!'],
  cooldown: 5,
  async execute(message, args, client) {
    
    const db = client.database.usersData;
    const key = `${message.author.id}`;
    const data = await db.get(key);
    
    let title = "";
    if (args[0]) title = args.slice(0).join(' ');
    if (title.length > 35) return message.react("❎");
    data.profile.title = title;
    await db.update(key, { profile: data.profile }).then(() => {
      message.react("✅");
    });
  }
}