module.exports = {
  name: 'endbuy',
  usages: ['endbuy'],
  examples: ['endbuy'],
  execute(message, args, client) {
    const cooldown = client.buyCooldown;
    const key = `${message.guild.id}${message.author.id}`;
    const replys = client.replys;
    
    if (cooldown.has(key)) {
      cooldown.delete(key);
      return message.channel.send(replys.success);
    } else {
      return message.channel.send(replys.error);
    }
  }
}