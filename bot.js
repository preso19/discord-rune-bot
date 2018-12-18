// Libraries
const Discord = require('discord.js');

// Helpers
const {capitalizeFirstLetter} = require('./app/core/helpers');

// Handle function
const {handle, log} = require('./app/core/handle');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Server is listening...');
});

client.on('message', message => {
    handle(message);
});

client.login(process.env.BOT_TOKEN).catch(e => {
    console.log("Discord API access error. Could not connect.");
    log(path.dirname(__filename) + path.basename(__filename) + " - " + String(e));
});
