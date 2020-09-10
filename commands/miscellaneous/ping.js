const { shouldUseEmbeds } = require('../../modules/functions');

module.exports = {
    name: 'ping',
    description: 'Ping.',
    aliases: ['pong'],
    cooldown: 3,
    execute(message, args, bot) {
        const embed = shouldUseEmbeds(message.author.id);
        if (embed) {
            return message.channel.send('Pinging...')
                .then(msg => {
                    let ping = Math.round(msg.createdTimestamp - message.createdTimestamp);
                    if(ping < 0) ping = 1;
                    msg.edit(null, {
                        embed: {
                            title: 'Bot Ping',
                            fields: [
                                {
                                    name: '🌐 WebSocket Latency',
                                    value: `${Math.round(bot.ws.ping)}ms`,
                                    inline: true,
                                },
                                {
                                    name: '⌛ Bot Ping',
                                    value: `${ping}ms`,
                                    inline: true,
                                },
                            ],
                            timestamp: new Date(),
                            footer: {
                                text: `Requested by ${message.author.tag} | Requested at `,
                                icon_url: message.author.displayAvatarURL(),
                            },
                        },
                    });
                });
        }
        return message.channel.send('Pinging...')
            .then(msg => {
                let ping = Math.round(msg.createdTimestamp - message.createdTimestamp);
                if(ping < 0) ping = 1;
                msg.edit(`**Bot Ping** - Requested by ${message.author.tag}\n🌐 WebSocket Latency: ${Math.round(bot.ws.ping)}ms\n⌛ Bot Ping: ${ping}ms`);
            });
    },
};

