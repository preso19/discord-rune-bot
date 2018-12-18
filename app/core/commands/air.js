const axios = require('axios');
const path = require('path');
const {air_token} = require('./../../../config/api/tokens/');
const {air_url} = require('./../../../config/api/urls/');
const {log} = require('./../handle');

module.exports = async commands => {
    if (commands.length < 3) {
        return "Wrong syntax.\n\n`/air <city> <country>`";
    }

    let city = commands[1];
    let country = commands[2];

    let url = air_url + 'city?city=' + city + '&state=' + city + '&country=' + country + '&key=' + air_token;

    return await axios.get(url).then(response => {
        let quality = response.data.data.current.pollution.aqius;
        let city = response.data.data.city;

        return 'The air quality in ' + capitalizeFirstLetter(city) + ' is ' + quality;
    }).catch(error => {
        log(path.dirname(__filename) + '/' + path.basename(__filename) + ' - ' + error);

        return 'Something has been broken please call Pavel. :OMEGALUL:';
    });
};
