require('dotenv').config();

const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.DISCORD_TOKEN });

manager.spawn();
manager.on('shardCreate', shard => {
    require('./modules/logger').log(`Loaded shard ${shard.id}`, 'IMPORTANT');
});
