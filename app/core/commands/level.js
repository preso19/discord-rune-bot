const axios = require('axios');
const path = require("path");
const {riot_token} = require('./../../../config/api/tokens/');
const {riot_url} = require('./../../../config/api/urls/');
const {log} = require('./../handle');

module.exports = async commands => {
    if (commands.length < 2) {
        return "Wrong syntax.\n\n`/level <username>`";
    }

    let username = commands[1];
    let url = riot_url + username + "?api_key=" + riot_token;

	return await axios.get(url).then(response => {
		if (response.data.status.status_code !== 200) {
			log(response.data.status.status_code + " - " + response.data.status.message);
			return 'Riot API Key has expired.';
		}

        return "The level of " + username + " is " + response.data['summonerLevel'];
    }).catch(error => {
        log(path.dirname(__filename) + "/" + path.basename(__filename) + " - " + error);
        return "Unexpected error.";
    });
};