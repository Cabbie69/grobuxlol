const { Client, Collection } = require('discord.js');
require('discord-reply');
const client = new Client();
const { token, prefix, language, color, dataBaseInfo } = require('./src/config');
const { guildsData, usersData } = require('./src/config').defaultData;
const DataBaseManager = require('./src/managers/database');
const { readdirSync } = require('fs');
const EventEmitter = require('events');


const events = readdirSync('events');
const disbut = require('discord-buttons');
disbut(client);

client.buyCooldown = new Map();
client.commands = new Collection();
client.prefix = prefix;
client.replys = require('./src/languages/' + language.substr(0, 2).toLowerCase());
client.color = color;
client.events = new EventEmitter();
client.database = {
  guildsData: new DataBaseManager(dataBaseInfo, { name: 'guildsData', default: guildsData }),
  usersData: new DataBaseManager(dataBaseInfo, { name: 'usersData', default: usersData }),
};

//client.database.guildsData.deleteAll();
//client.database.usersData.deleteAll();

events.filter(e => e.endsWith('.js')).forEach(event => {
  event = require(`./events/${event}`)(client);
  event.once ? client.once(event.name, event.execute) : client.on(event.name, event.execute);
});

events.filter(e => !e.endsWith('.js')).forEach(folder => {
  readdirSync('events/' + folder).forEach(event => {
    event = require(`./events/${folder}/${event}`)(client);
    event.once ? client.once(event.name, event.execute) : client.on(event.name, event.execute);
  });
});

for (let folder of readdirSync('commands').filter(folder => !folder.includes('.'))) {
  for (let file of readdirSync('commands/' + folder).filter(f => f.endsWith('.js'))) {
    let command = require(`./commands/${folder}/${file}`);
    command.category = folder;
    try {
      let { helps } = client.replys[command.name];
      if (helps.description) command.description = helps.description;
      if (helps.aliases) command.aliases = helps.aliases;
    } catch {}
    client.commands.set(command.name, command);
  }
}
client.on("message", message => {

 if(message.channel.id === "906651243106148442") return message.react("❤") 

})  





client.login(token);
require('./src/util');