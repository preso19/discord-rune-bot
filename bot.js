// Libraries
const Discord = require('discord.js');

// Helpers
const {capitalizeFirstLetter} = require('./app/core/helpers');

// Handle function
const {handle, log} = require('./app/core/handle');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Server is listening...');

    // Notifications
    require('./app/core/notify').execute({
        default: client.channels.get(process.env.channel_id_default),
        lec: client.channels.get(process.env.channel_id_lec),
        lcs: client.channels.get(process.env.channel_id_lcs),
    });
});

client.on('message', message => {
    handle(message);
});

client.login(process.env.BOT_TOKEN).catch(e => {
    console.log('Discord API access error. Could not connect.');
    log(path.dirname(__filename) + path.basename(__filename) + ' - ' + String(e));
});
