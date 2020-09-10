const { MessageEmbed } = require('discord.js');
const { shouldUseEmbeds, getBadges, getGlobalBanned } = require('../../modules/functions');
const { getDonationBadge, activeWarninigs, getCustomDescription } = require('../../modules/utilities');

module.exports = {
    name: 'profile',
    description: 'Shows profile!',
    async execute(message, args, bot) {
        const embed = shouldUseEmbeds(message.author.id);
        let member = message.mentions.users.first();

        if(!member) {
            if(args[0]) {
                await bot.users.fetch(args[0])
                    .then(user => {
                        member = user;
                    })
                    .catch(() => {
                        if(embed) {
                            return message.channel.send(message.author.toString(), {
                                embed: {
                                    title: 'Invalid User',
                                    description: 'This user could not be found in my database, please try again.',
                                },
                            });
                        }
                        return message.channel.send('**Invalid User**\nThis user could not be found in my database, please try again.');
                    });
            }
            else {
                member = message.author;
            }
        }

        const badgeReturn = getDonationBadge();
        const customDescription = await getCustomDescription(member.id);

        const ProfileEmbed = new MessageEmbed()
            .setTitle(`${member.tag}'s Profile`)
            .setThumbnail(member.displayAvatarURL({ dymanic: true }))
            .setTimestamp(new Date())
            .setFooter(`Requested by ${message.author.tag} | Requested at`, message.author.displayAvatarURL())
            .addFields(
                { name: 'User', value: member.toString(), inline: true },
                { name: 'Donation Tier', value: `${badgeReturn[0]} (Tier ${badgeReturn[1]})`, inline: true },
                { name: 'Badges', value: getBadges(member.id), inline: true },
            );
        if(getGlobalBanned(member.id)) {
            ProfileEmbed.setDescription('❌ This user is global banned.');
        }
        else if (activeWarninigs(member.id) > 0) {
            ProfileEmbed.setDescription('⚠️ This user has an active report.');
        }
        else if (customDescription) {
            ProfileEmbed.setDescription(customDescription);
        }

        message.channel.send(ProfileEmbed);
    },
};