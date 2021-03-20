// Libraries
const Discord = require('discord.js');

// Helpers
const {capitalizeFirstLetter} = require('./app/core/helpers');

// Handle function
const {handle, log} = require('./app/core/handle');

const client = new Discord.Client();

const channelIds = {
    default: process.env.channel_id_default,
    lec: process.env.channel_id_lec,
    lcs: process.env.channel_id_lcs,
};

client.on('ready', () => {
    console.log('Server is listening...');

    // Notifications
    // require('./app/core/notify').execute({
    //     default: client.channels.get(channelIds.default),
    //     lec: client.channels.get(channelIds.lec),
    //     lcs: client.channels.get(channelIds.lcs),
    // });
});

client.on('message', message => {
    handle(message, channelIds);
});

client.login(process.env.BOT_TOKEN).catch(e => {
    console.log('Discord API access error. Could not connect.');
    log(path.dirname(__filename) + path.basename(__filename) + ' - ' + String(e));
});
