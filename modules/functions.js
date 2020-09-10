/* eslint-disable no-unused-vars */
const svgCaptcha = require('svg-captcha');
const svg2img = require('node-svg2img');
// const nodecaptcha = require('nodejs-captcha');
const fs = require('fs');

const badges = {
    OWNER: '<:owner:735212263685750934>',
    SUPPORT_STAFF: '<:supportstaff:735180712042299492>',
    VERIFIED: '<:verified:735173910429040741>',
};

module.exports = {
    async getPrefix(guildID) {
        return 'sec!';
    },

    canSendMessages(message) {
        const permissions = message.channel.permissionsFor(message.guild.me);
        if(!permissions.has('SEND_MESSAGES')) {
            if(permissions.has('ADD_REACTIONS')) {
                message.react('❌');
            }
            return false;
        }
        else {
            return true;
        }
    },

    codeblock(code) {
        return '```\n​' + code + '```';
    },

    shouldUseEmbeds(userID) {
        return true;
    },

    getBadges(userID) {
        const badgesToReturn = [];
        if(userID == '720257380100735008') badgesToReturn.push(badges.OWNER);
        badgesToReturn.push(badges.VERIFIED);

        return badgesToReturn.join('');
    },

    rankCheck(userID) {
        return false;
    },

    getVerificationChannel(guildID) {
        return '734406863575318651';
    },

    getLogChannel(guildID) {
        return '734410925796491294';
    },

    getGlobalBanned(userID) {
        return false;
    },

    getDonationLevel(userID) {
        return 3;
    },

    generateCaptcha() {
        const captcha = svgCaptcha.create({
            size: 6,
            noise: 3,
            color: true,
            background: '#2f3136',
        });

        return [
            svg2img(captcha.data, function(error, buffer) {
                return buffer;
            }),
            captcha.text,
        ];
    },

    tryBuffer() {
    /*
       const captcha = svgCaptcha.create({
            size: 6,
            noise: 3,
            color: true,
            background: '#2f3136',
        });
        */

        // const captcha = nodecaptcha();
        // return Buffer.from(captcha.image);
        // return captcha;
    },
};