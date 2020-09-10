const { shouldUseEmbeds } = require('../../modules/functions');
const { convertMStoHR } = require('../../modules/utilities');

module.exports = {
    name: 'statistics',
    description: 'Shows statistics!',
    aliases: ['stats', 'info', 'uptime'],
    execute(message, args, bot) {
        const embed = shouldUseEmbeds(message.author.id);
        if(embed) {
            message.channel.send({
                embed: {
                    title: `${bot.user.username}'s Statistics`,
                    fields: [
                        {
                            name: 'Guild(s)',
                            value: bot.guilds.cache.array().length,
                            inline: true,
                        },
                        {
                            name: 'User(s)',
                            value: bot.users.cache.array().length,
                            inline: true,
                        },
                        {
                            name: 'Uptime',
                            value: convertMStoHR(bot.uptime),
                            inline: true,
                        },
                    ],
                    thumbnail: {
                        url: bot.user.displayAvatarURL({ dynamic: true }),
                    },
                    timestamp: new Date(),
                    footer: {
                        text: `Requested by ${message.author.tag} | Requested at `,
                        icon_url: message.author.displayAvatarURL(),
                    },
                },
            });
        }
    },
};