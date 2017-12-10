const {discord_token} = require('./config/auth.json');
const {riot_token} = require('./config/riot_api_token.json');

const Discord = require('discord.js');
const axios = require('axios');

const riot_api_url = "https://eun1.api.riotgames.com/lol/";

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Server is listening...');
});

client.on('message', message => {

    let inputs = message.content.split(' ');

    if (inputs[0].toLowerCase() === '/level') {
        writeAccountInfo(inputs[1], "summonerLevel", "Level", message);
    } else if (inputs[0] === '/ask') {
        let answers = require('./data/asnwers.js');

        message.channel.send(answers[Math.floor(Math.random() * answers.length) + 1]);
    }
});

function writeAccountInfo(username, property, property_name, message) {
    let url = riot_api_url + "summoner/v3/summoners/by-name/" + username + "?api_key=" + riot_token;

    axios.get(url)
        .then(response => {
            message.channel.send(property_name + " of user " + username + ": " + response.data[property]);
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

client.login(discord_token);