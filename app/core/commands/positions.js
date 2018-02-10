module.exports = async commands => {
    if (commands.length < 2) {
        return "Wrong syntax.\n\n`/positions <count>`";
    }

    let count = Number(commands[1]);

    if (count < 1 || count > 5) {
        return "Wrong syntax.\n\n`/positions <count (1 to 5)>`";
    }

    let positions = require('./../../static/positions');

    let role;
    let roles = "";
    let instance = positions.slice(0);

    for (let i = 1; i < count + 1; i++) {
        role = Math.floor(Math.random() * instance.length);
        roles += "Chovek #" + i + " shte cuka: " + instance[role] + "\n";
        instance.splice(role, 1);
    }

    return roles;
};