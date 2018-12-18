const axios = require('axios');
const path = require('path');
const {air_token} = require('./../../../config/api/tokens/');
const {air_url} = require('./../../../config/api/urls/');
const {log} = require('./../handle');

module.exports = async commands => {
    if (commands.length < 2) {
        return 'Wrong syntax.\n\n`/air Country-State-City`';
    }

    let params = commands[1].split('-');
    let country = params[0];
    let state = params[1];
    let city = params[2];

    if (params.length < 3) {
        return 'Wrong syntax.\n\n`/air Country-State-City`';
    }

    let url = air_url + 'city?city=' + city + '&state=' + state + '&country=' + country + '&key=' + air_token;

    return await axios.get(url).then(response => {
        let quality = response.data.data.current.pollution.aqius;
        let city = response.data.city;

        return 'The air quality in ' + city + ' is ' + quality;
    }).catch(error => {
        log(path.dirname(__filename) + '/' + path.basename(__filename) + ' - ' + error);

        return 'Something has been broken please call Pavel. :OMEGALUL:';
    });
};
