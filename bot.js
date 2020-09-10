require('dotenv').config();

const { Client, Collection } = require('discord.js');

const { log } = require('./modules/logger');
const { readdirSync } = require('fs');

const bot = new Client();
bot.commands = new Collection();
bot.cooldowns = new Collection();
bot.loadingStarted = new Date();
bot.log = log;

readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}/`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        bot.log(`Loading Command \x1b[36m${file.split('.')[0]}\x1b[0m in module \x1b[36m${dirs}\x1b[0m`, 'SUCCESS');
        const command = require(`./commands/${dirs}/${file}`);
        bot.commands.set(command.name, command);
    }
});

readdirSync('./events/').forEach(event => {
    bot.log(`Loading Event \x1b[36m${event.split('.')[0]}\x1b[0m`, 'SUCCESS');
    const eventCode = require(`./events/${event}`);
    const eventName = event.split('.')[0];
    bot.on(eventName, eventCode.bind(null, bot));
});

bot.login();