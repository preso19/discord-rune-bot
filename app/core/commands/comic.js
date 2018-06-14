const axios = require('axios');
const path = require("path");

module.exports = async commands => {
    let min = 1;
    let max = 1955;

    let random = Math.floor(Math.random() * (max - min + 1)) + min;

    let url = "https://xkcd.com/" + random + "/info.0.json";

    return await axios.get(url).then(response => {
    	let decodedResponse = JSON.parse(response);

        return decodedResponse.img;
    }).catch(error => {
        log(path.dirname(__filename) + "/" + path.basename(__filename) + " - " + error);
        return "The comic was not found.";
    });
};
