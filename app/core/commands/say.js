module.exports = async commands => {
    commands.shift();

    return commands.join(' ');
};
