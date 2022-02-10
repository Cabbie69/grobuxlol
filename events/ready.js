const { language, presence } = require('../src/config');

module.exports = client => ({
  name: 'ready',
  once: true,
  async execute() {
    require('../api')(client)
    client.user.setPresence(presence);
    console.log(`${client.user.tag} Is Online !`);
    //
    const guilds = client.database.guildsData;
    const users = client.database.usersData;
    async function setup() {
      await client.guilds.cache.forEach(async (guild) => {
        await guilds.setDefault(guild.id);
      });
      await client.users.cache.forEach(async (user) => {
        if (!user.bot) await users.setDefault(user.id);
      });
    }
    await setup();
    setInterval(async () => {
      await setup();
    }, 60000 * 15);
  }
});