/* eslint-disable no-unused-vars */
const { getDonationLevel } = require('./functions');

const donationBadges = [
    '[Donate](https://google.com/)',
    '<:donation1:735178120444903434>',
    '<:donation2:735178120646361089>',
    '<:donation3:735178120964866069>',
];

module.exports = {
    formatDate(d) {
        return [
            d.getMonth() + 1,
            d.getDate(),
            d.getFullYear()].join('/') + ' ' +
            [
                d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');

    },

    getDonationBadge(userID) {
        return [
            donationBadges[getDonationLevel(userID)],
            getDonationLevel(userID),
        ];
    },

    activeWarninigs(userID) {
        return 0;
    },

    getCustomDescription(userID) {
        if(userID == '720257380100735008') return '<:owner:735212263685750934> Bot Owner';
        return false;
    },

    convertMStoHR(ms) {
        function slice(input) {
            return ('00' + input).slice(-2);
        }

        let seconds = ms / 1000;
        const hours = parseInt(seconds / 3600);
        seconds = seconds % 3600;
        const minutes = parseInt(seconds / 60);
        seconds = seconds % 60;
        return `${slice(hours)}:${slice(minutes)}:${slice(Math.floor(seconds))}`;
    },
};