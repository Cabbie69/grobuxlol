const { owners } = require("../../src/config");

module.exports = {
  name: "blacklist",
  usages: ["blacklist", "blacklist (Type) (Add/Remove) (Id)"],
  examples: [
    "blacklist",
    "blacklist servers add 828391840173927493",
    "blacklist servers remove 828391840173927493",
    "blacklist users add 409271849284918463",
    "blacklist users remove 409271849284918463"
  ],
  owners: true,
  async execute(message, args, client) {
    const guilds = client.database.guildsData;
    const users = client.database.usersData;

    if (!args[0]) {
      let data1 = await guilds.getKeys();
      let data2 = await users.getKeys();
      let blacklistServers = [];
      let blacklistUsers = [];
      if (data1 != undefined) {
        for (let i = 0; i <= data1.size - 1; i++) {
          let data = data1.getElementByIndex(i);
          if (data.value.blacklisted) {
            blacklistServers.push(data.key);
          }
        }
      }
      if (data2 != undefined) {
        for (let i = 0; i <= data2.size - 1; i++) {
          let data = await data2.getElementByIndex(i);
          if (data.value.blacklisted) {
            blacklistUsers.push(data.key);
          }
        }
      }
      let black = ``;
      if (blacklistServers.length)
        black += `Servers:\n${blacklistServers.join("\n")}`;
      if (black != `` && blacklistUsers.length)
        black += `\nــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ\n`;
      if (blacklistUsers.length)
        black += `Users:\n${blacklistUsers.join("\n")}`;
      if (black == ``)
        return message.lineReplyNoMention(`> **Empty blacklist !**`);
      return message.lineReplyNoMention(
        `Server: [**\`${blacklistServers.length}\`**]\nUsers: [**\`${blacklistUsers.length}\`**]\nــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ\n${black}`,
        { split: true }
      );
    } else {
      let type = null;
      if (args[0].toLowerCase() == "servers") {
        type = "servers";
      } else if (args[0].toLowerCase() == "users") {
        type = "users";
      }
      if (!type) return message.lineReplyNoMention(`> **Syntax Error !**`);
      let action = null;
      if (args[1].toLowerCase() == "add") {
        action = "add";
      } else if (args[1].toLowerCase() == "remove") {
        action = "remove";
      }
      if (!action || !args[2])
        return message.lineReplyNoMention(`> **Syntax Error !**`);
      if (type == "servers") {
        const guild = client.guilds.cache.get(args[2]);
        if (!guild)
          return message.lineReplyNoMention(
            `> **I cannot find this server !**`
          );
        let data = (await guilds.get(guild.id)) || {};
        await guilds.setDefault(guild.id);
        if (action == "add") {
          if (data.blacklisted)
            return message.lineReplyNoMention(
              `> **This server already blacklisted !**`
            );
          await guilds
            .update(guild.id, {
              blacklisted: true
            })
            .then(() => {
              return message.lineReplyNoMention(
                `> **${guild.name}, has been added to the blacklist successfully !**`
              );
            });
        } else {
          if (!data.blacklisted)
            return message.lineReplyNoMention(
              `> **I can't find this server in the blacklist !**`
            );
          await guilds
            .update(guild.id, {
              blacklisted: false
            })
            .then(() => {
              return message.lineReplyNoMention(
                `> **${guild.name}, server has been removed from the blacklist successfully !**`
              );
            });
        }
      } else {
        const user = client.users.cache.get(args[2].toUserId());
        if (!user)
          return message.lineReplyNoMention(`> **I cannot find this user !**`);
        if (user.bot)
          return message.lineReplyNoMention(`> **You cannot add robots !**`);
        if (owners.includes(user.id))
          return message.lineReplyNoMention(`> **You cannot add this user !**`);
        let data = (await users.get(user.id)) || {};
        await users.setDefault(user.id);
        if (action == "add") {
          if (data.blacklisted)
            return message.lineReplyNoMention(
              `> **This user already blacklisted !**`
            );
          await users
            .update(user.id, {
              blacklisted: true
            })
            .then(() => {
              return message.lineReplyNoMention(
                `> **${user.tag}, has been added to the blacklist successfully !**`
              );
            });
        } else {
          if (!data.blacklisted)
            return message.lineReplyNoMention(
              `> **I can't find this user in the blacklist !**`
            );
          await users
            .update(user.id, {
              blacklisted: false
            })
            .then(() => {
              return message.lineReplyNoMention(
                `> **${user.tag}, server has been removed from the blacklist successfully !**`
              );
            });
        }
      }
    }
  }
};
