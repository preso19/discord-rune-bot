const Discord = require('discord.js');
const axios = require('axios');

const {discord_token} = require('./config/auth.json');
const {riot_token} = require('./config/riot_api_token.json');
const {wg_token} = require('./config/wunderground_token.json');

const riot_api_url = "https://eun1.api.riotgames.com/lol/";
const wg_api_url = "http://api.wunderground.com/api/";

const client = new Discord.Client();

client.on('ready', () => {
    console.log('Server is listening...');
});

client.on('message', message => {

    let inputs = message.content.split(' ');
    let command = inputs[0].toLowerCase();

    if (command === '/level') {
        writeAccountInfo(inputs[1], "summonerLevel", "Level", message);
    } else if (command === '/ask') {
        let answers = require('./data/answers.js');

        message.channel.send(answers[Math.floor(Math.random() * answers.length)]);
    } else if (command === "/weather") {
        let url = wg_api_url + wg_token + "/conditions/q/BG/" + capitalizeFirstLetter(inputs[1]) + ".json";

        axios.get(url)
            .then(response => {
                let temp = response.data.current_observation.temperature_string.split('(')[1].slice(0, -1);
                let weather = response.data.current_observation.weather;

                message.channel.send(`${temp} (${weather})`);
            })
            .catch(error => {
                console.log(error);
                message.channel.send('404 city not found.');
            })
    } else if (command === '/champ') {
        let champions = require('./data/champions');

        message.channel.send("Shte trqbva da igraesh: " + champions[Math.floor(Math.random() * champions.length)]);
    } else if (command === '/3champs') {
        let champions = require('./data/champions');

        message.channel.send(
            "Geroi: "
            + champions[Math.floor(Math.random() * champions.length)] + ", "
            + champions[Math.floor(Math.random() * champions.length)] + ", "
            + champions[Math.floor(Math.random() * champions.length)]
        );
    } else if (command === '/positions') {
        if (typeof inputs[1] === "undefined" || inputs[1] < 0 || inputs[1] > 6) {
            message.channel.send("Wrong command syntax the command must look like: `/positions {number}`");
        } else {
            let positions = require('./data/positions');
            let selected_role;
            let cycles = Number(inputs[1]) + 1;

            for (let i = 1; i < cycles; i++) {
                selected_role = Math.floor(Math.random() * positions.length);

                message.channel.send("Chovek #" + i + " shte cuka: " + positions[selected_role]);

                positions.splice(selected_role, 1);
            }
        }
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

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}

client.login(discord_token)
    .catch(e => {
        console.log("Discord API key error. Could not connect.");
        console.log(String(e));
    });