const { deleteConfig } = require('../modules/functions');

module.exports = (bot, guild) => {
    deleteConfig(guild);
    const logChannel = bot.channels.get('734190605764395028');
    logChannel.send({
        embed: {
            title: '🔴 Guild Leave',
            fields: [
                {
                    name: 'Guild Name',
                    value: guild.name,
                    inline: true,
                },
                {
                    name: 'Guild Members',
                    value: guild.memberCount,
                    inline: true,
                },
                {
                    name: 'ID',
                    value: guild.id,
                    inline: true,
                },
                {
                    name: 'Region',
                    value: guild.region,
                    inline: true,
                },
                {
                    name: 'Large Server',
                    value: guild.large,
                    inline: true,
                },
            ],
            image: {
                url: guild.iconURL({ dynamic: true }),
            },
        },
    });
};