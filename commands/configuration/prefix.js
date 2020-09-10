const { getPrefix, shouldUseEmbeds } = require('../../modules/functions');

module.exports = {
    name: 'prefix',
    description: 'Get your prefix.',
    async execute(message) {
        const prefix = await getPrefix(message.guild.id);
        const embed = shouldUseEmbeds(message.author.id);

        if(embed) {
            return message.channel.send({
                embed: {
                    title: 'Bots Prefix',
                    description: `My prefix for this guild is: \`${prefix}\``,
                },
            });
        }
        return message.channel.send(`**Bots Prefix**\nMy prefix for this guild is: \`${prefix}\``);
    },
};

