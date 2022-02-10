const fetch = require('node-fetch');

module.exports = {
  name: 'say',
  usages: ['say (Message)'],
  examples: ['say Hello world !'],
  owners: true,
  async execute(message, args, client) {
    
    if (!args[0]) return;
    
    message.channel.send(args.slice(0).join(' ')).then(() => {
      message.delete();
    });
  }
}