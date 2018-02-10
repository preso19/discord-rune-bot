let fs = require('fs');

module.exports = {
    handle: message => {
        let commands = require('./commands');

        let inputs = message.content.toLowerCase().split(' ');

        if (commands.includes(inputs[0].slice(1))) {
            require('./commands' + inputs[0] + '.js')(inputs).then(
                response => message.channel.send(response)
            );
        }
    },

    log: error => {
        let date = new Date();
        let write = "[" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
        write += " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] ";
        write += error + "\n";

        fs.appendFile('./app/logs/errors.txt', write, e => {
            e ? console.log(e) : '';
        });
    }
};