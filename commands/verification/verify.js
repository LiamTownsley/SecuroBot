const { MessageAttachment } = require('discord.js');
const { generateCaptcha } = require('../../modules/functions');

module.exports = {
    name: 'verify',
    description: 'Verify!',
    execute(message) {
        const captcha = generateCaptcha();
        console.log(captcha);

        /*const file = new MessageAttachment(captcha[0], 'captcha.png');
        message.channel.send({
            files: [file],
            embed: {
                title: 'Embed',
                image: {
                    url: 'attachment://captcha.png',
                },
            },
        });*/

    },
};