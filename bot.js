// Libraries
const Discord = require('discord.js');
const axios = require('axios');

// API Token
const {discord_token} = require('./config/api/tokens/');

// Handle function
const {handle} = require('./app/core/handle');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Server is listening...');
});

client.on('message', message => {
    handle(message);
});

function getTopPosts(url, count, message) {
    axios.get(url)
        .then(response => {
            for (let i = 0; i < count;) {
                let currentPost = response.data.data.children[i].data;

                message.channel.send('Currently #' + ++i + ' is titled: ' + currentPost.title + ' Link: '
                    + reddit_base_url + currentPost.permalink);
            }
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

//process.env.BOT_TOKEN
client.login(discord_token).catch(e => {
    console.log("Discord API key error. Could not connect.");
    console.log(String(e));
});
