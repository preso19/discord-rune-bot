module.exports = async commands => {
    if (commands.length < 2) {
        return "Wrong syntax.\n\n`/champs <count>`";
    }

    let count = Number(commands[1]);

    if (count < 1 || count > 5) {
        return "Wrong syntax.\n\n`/champs <count (1 to 5)>`";
    }

    let champions = require('./../../static/champions');
    let champs = [];

     for (let i = 0; i < count; i++) {
         champs[i] = champions[Math.floor(Math.random() * champions.length)];
     }

     return "Izbirai mejdu: " + champs.join(", ");
};