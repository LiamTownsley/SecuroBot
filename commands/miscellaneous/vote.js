const { shouldUseEmbeds } = require('../../modules/functions');

const links = [
    // 'https://top.gg/bot/733639205032296539', REASON: PENDING APPROVAL
    'https://discordextremelist.xyz/en-GB/bots/securobot',
    'https://discordbotlist.com/bots/securobot',
    'https://bots.ondiscord.xyz/bots/733639205032296539',
    'https://discord.bots.gg/bots/733639205032296539',
];

let embedLinksToSend = '';
let linksToSend = '';

// eslint-disable-next-line prefer-const
for (let [i, value] of links.entries()) {
    if(i == 0) {embedLinksToSend = embedLinksToSend + `\n[Link ${i + 1}](${value})`;}
    else {embedLinksToSend = embedLinksToSend + ` | [Link ${i + 1}](${value})`;}
}

// eslint-disable-next-line prefer-const
for(let [i, value] of links.entries()) {
    linksToSend = linksToSend + `\nLink ${i + 1}: <${value}>`;
}


module.exports = {
    name: 'vote',
    description: 'Vote.',
    execute(message) {
        const embed = shouldUseEmbeds(message.author.id);
        if(embed) {
            return message.channel.send({
                embed: {
                    title: 'Vote for the Bot',
                    description: 'You can vote for the bot using any of these links:' + embedLinksToSend,
                    timestamp: new Date(),
                    footer: {
                        text: `Requested by ${message.author.tag} | Requested at `,
                        icon_url: message.author.displayAvatarURL(),
                    },
                },
            });
        }
        return message.channel.send(`**Vote for the Bot**\nYou can vote for the bot using any of these links:\n${linksToSend}`);
    },
};

