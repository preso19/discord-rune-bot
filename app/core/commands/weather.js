const axios = require('axios');
const path = require("path");
const {wunderground_token} = require('./../../../config/api/tokens/');
const {wunderground_url} = require('./../../../config/api/urls/');
const {log} = require('./../handle');

module.exports = async commands => {
    if (commands.length < 2) {
        return "Wrong syntax.\n\n`/weather <name of bulgarian city>`";
    }

    let city = capitalizeFirstLetter(commands[1]);

    let url = wunderground_url + wunderground_token + "/conditions/q/BG/" + city + ".json";

    return await axios.get(url).then(response => {
        let temp = response.data.current_observation.temperature_string.split('(')[1].slice(0, -1);
        let weather = response.data.current_observation.weather;
        let connector = city.charAt(0).toLowerCase() === "v" ? "vav" : "v";

        return "Vremeto " + connector + " " + city + " e " + weather + ", (" + temp + ")";
    }).catch(error => {
        log(path.dirname(__filename) + "/" + path.basename(__filename) + " - " + error);
        return "The city was not found.";
    });
};