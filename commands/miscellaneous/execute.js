const { codeblock } = require('../../modules/functions');
const {
    exec,
} = require('child_process');

// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');

module.exports = {
    name: 'execute',
    description: 'Developer Only Command',
    aliases: ['eval'],
    devOnly: true,
    execute(message, args) {
        const code = args.slice(1).join(' ');

        if (args[0] == 'os') {
            exec(code, (err, stdout, stderr) => {
                if (err) return console.log(err);
                console.log(stdout);
                message.channel.send('**Code Executed!** Output will be sent to your DMs.');
                message.author.send(`OS execution output from command \`${code}\`:`);

                message.author.send(codeblock(stdout));
                console.log(stderr);
            });
        }

        if (args[0] == 'js') {
            try {
                message.channel.send('**Code Executed!** Output will be sent to your DMs.');
                message.author.send(`JS execution output from command \`${code}\`:`);
                const output = eval(code);
                message.author.send(codeblock(output));
            }
            catch (err) {
                message.channel.send('**Error!** The error message has been DM\'d to you.');
                message.author.send(err, {
                    code: 'x1',
                });
            }
        }
    },
};