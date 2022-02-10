const { MessageEmbed } = require('discord.js');
const { owners } = require('../../src/config.js');

module.exports = {
  name: 'help',
  usages: ['help', 'help (Command)'],
  cooldowns: 5,
  help: false,
  dm: true,
  async execute(message, args, client) {
    
    if (message.channel.type == 'dm') {
      
      message.channel.send(
        new MessageEmbed()
        .setColor(client.color)
        .setTitle('RobuxHelp')
        .setDescription(`**Balance Command:**\n\`-balance\`\n**transfer command:**\n\`-transfer\``)
      );
      
      return;
    }
    if (!owners.includes(message.author.id)) return;
    
    
    const replys = client.replys;
    
    var embed = new MessageEmbed()
    .setFooter(replys.more.replace(/\{prefix}/g, `${client.prefix}`))
    .setColor(client.color);
    
    if (args[0] && args[0].toLowerCase() != 'help') {
      const command = client.commands.get(args[0].toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0].toLowerCase()));
      if (!command || command.help == false || command.category == "dev") return message.lineReplyNoMention(replys.invalid);
      const { helps } = client.replysAll[command.name];
      if (helps.description) command.description = helps.description;
      if (helps.aliases) {
        if (helps.aliases != command.aliases) helps.aliases.forEach(e => command.aliases.push(e));
      }
      embed.setTitle(replys.title.replace(/\{command}/g, `${command.name}`)); 
      embed.setFooter('');
      if (command.description) embed.setDescription(command.description);
      if (command.aliases) embed.addField(replys.helps.types[0], command.aliases.map(e => `${client.prefix}${e}`).join(`\n`));
      if (command.usages) embed.addField(replys.helps.types[1], command.usages.map(e => `${client.prefix}${e}`).join(`\n`));
      let roles = [{ name: "test", id: "980273817380472813" }];
      if (message.guild) roles = message.guild.roles.cache.map(r => r);
      if (command.examples) embed.addField(replys.helps.types[2], command.examples.map(e => `${client.prefix}${e.replace(/\{userMention}/g, `<@${message.author.id}>`).replace(/\{userId}/g, `${message.author.id}`).replace(/\{channelMention}/g, `<#${message.channel.id}>`).replace(/\{channelId}/g, `${message.channel.id}`).replace(/\{roleMention}/g, `<@&${roles.filter(r => r.name != "@everyone")[0].id}>`).replace(/\{roleId}/g, `${roles.filter(r => r.name != "@everyone")[0].id}`)}`).join(`\n`));
    } else {
      let commands = [];
      client.commands.filter(e => e.category != 'devs' && (e.help == undefined || e.help == true)).forEach(cmd => {
        commands.push({ name: `\`${client.prefix}${cmd.name}\``, category: cmd.category });
      });
      let general = commands.filter(cmd => cmd.category == 'general').map(cmd => cmd.name);
      let admins = commands.filter(cmd => cmd.category == 'admins').map(cmd => cmd.name);
      let robux = commands.filter(cmd => cmd.category == 'robux').map(cmd => cmd.name);
      embed.setTitle(replys.list);
      if (general.length) embed.addField(replys.types[0], general.join(', '));
      if (admins.length) embed.addField(replys.types[1], admins.join(', '));
      if (robux.length) embed.addField(replys.types[2], robux.join(', '));
    }
    message.lineReplyNoMention('', { embed: embed, split: true });
  }
}