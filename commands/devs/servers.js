const { MessageEmbed } = require('discord.js');
const humanizeDuration = require("humanize-duration");
const moment = require('moment');

module.exports = {
  name: 'se',
  usages: ['servers'],
  examples: ['servers'],
  owners: true,
  async execute(message, args, client) {
    
    message.lineReplyNoMention(`[${client.guilds.cache.size}]\n` + client.guilds.cache.sort((a, b) => b.me.joinedTimestamp - a.me.joinedTimestamp).map(e => e.name + ' [\`' + e.memberCount + '\`] ' + moment(e.me.joinedAt).fromNow()).join('\n'), {
      split: true
    });
    
  }
}