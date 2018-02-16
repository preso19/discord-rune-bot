const fs = require('fs');
const path = require('path');
const {log} = require('./../handle');
let ids = require('./../../static/steamIds');

module.exports = async commands => {
    if (commands.length < 2) {
        return "Wrong syntax.\n\n`/play [<name>s ...]`";
    }

    let url = 'https://steamparty.azurewebsites.net/#';
    let query = [];
    commands.shift();

    for (let name of commands) {
        if (!(name in ids)) {
            return "Name(s) not found.";
        } else {
           query.push(ids[name]);
        }
    }

    url +=  query.join(',');

    // return await
};