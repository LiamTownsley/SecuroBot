// eslint-disable-next-line no-unused-vars
const { Collection } = require('discord.js');
const {
    getPrefix,
    canSendMessages,
    codeblock,
    shouldUseEmbeds,
} = require('../modules/functions');

module.exports = async (bot, message) => {
    try {
        if(message.channel.type !== 'text') return;
        const prefix = await getPrefix(message.guild.id);

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const embed = shouldUseEmbeds(message.author.id);

        const command = bot.commands.get(commandName) ||

        bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        if (!bot.cooldowns.has(command.name)) {
            bot.cooldowns.set(command.name, new Collection());
        }

        const now = Date.now();
        const timestamps = bot.cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    if(embed) {
                        return message.channel.send(message.author.toString(), {
                            embed: {
                                title: 'Cooldown',
                                description: `This command is on cooldown, please wait ${timeLeft.toFixed(1)} more second(s) before reusing the command.`,
                            },
                        });
                    }
                    return message.channel.send(`**Cooldown**\n${message.author.toString()}, this command is on cooldown, please wait ${timeLeft.toFixed(1)} more second(s) before reusing the command.`);
                }
            }

        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        if (command.args && !args.length) {
            if(embed) {
                return message.channel.send(message.author.toString(), {
                    embed: {
                        title: 'Invalid Arguments',
                        description: 'This command requires arguments, you didn\'t supply any.',
                    },
                });
            }
            return message.channel.send(`**Invalid Arguments**\n${message.author.toString()}, this command requires arguments, you didn't supply any.`);
        }


        if(!canSendMessages(message)) return;
        command.execute(message, args, bot);
    }
    catch (error) {
        console.error(error);
        message.guild.channels.resolve('734820745284288572')
            .send({
                embed: {
                    title: 'Error!',
                    description: codeblock(error),
                    timestamp: new Date(),
                },
            });
    }
};