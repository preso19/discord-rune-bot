module.exports = async commands => {
    if (commands.length < 2) {
        return "Wrong syntax.\n\n`/ask <question>`";
    }

    let answers = require('./../../static/answers');

    return answers[Math.floor(Math.random() * answers.length)];
};