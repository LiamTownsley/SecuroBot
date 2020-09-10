const { getPrefix, getVerificationChannel, getLogChannel } = require('../modules/functions');
const { formatDate } = require('../modules/utilities');

module.exports = async (bot, member) => {
    const logChannel = await bot.channels.fetch(getLogChannel());
    const verifyChannel = await bot.channels.fetch(getVerificationChannel());

    member.send({
        embed: {
            title: `Welcome to ${member.guild.name}`,
            description: `You have joined a server protected by SecuroBot. If you would like full access to the server, you can type \`${await getPrefix(member.guild.id)}verify\` in ${verifyChannel.toString()} and follow the instructions given.`,
            thumbnail: {
                url: member.guild.iconURL({ dynamic: true }),
            },
        },
    });
    logChannel.send({
        embed: {
            title: 'Guild Member Joined',
            fields: [
                {
                    name: 'Member',
                    value: member.toString(),
                    inline: true,
                },
                {
                    name: 'Created At',
                    value: formatDate(new Date(member.user.createdAt)),
                    inline: true,
                },
            ],
            thumbnail: {
                url: member.user.displayAvatarURL({ dymanic: true }),
            },
        },
    });
};