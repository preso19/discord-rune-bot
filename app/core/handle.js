let fs = require('fs');
let axios = require('axios');
let onDevEnv = !Boolean(process.env.BOT_TOKEN);
let commandsPath = './app/core/commands/';

module.exports = {
	handle: message => {
		let commands = fs.readdirSync(commandsPath).map(command => command.replace(/.js/, ''));

		let inputs = message.content.toLowerCase().split(' ');

		if (commands.includes(inputs[0].slice(1))) {
			require('./commands' + inputs[0] + '.js')(inputs).then(
				response => message.channel.send(response)
			);
		}
	},

	log: error => {
		let date = new Date();
		let bugMsg = "[" + date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
		bugMsg += " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "] ";
		bugMsg += error + "\n";

		if (onDevEnv) {
			fs.appendFile('./app/logs/errors.txt', bugMsg, e => {
				e ? console.log(e) : '';
			});

			return;
		}

		axios({
			method: 'post',
			url: 'https://api.github.com/repos/preso19/discord-rune-bot/issues',
			data: {
				"title": "Automated bug report",
				"body": bugMsg,
				"assignees": [
					"dvdty",
					"preso19"
				],
				"labels": [
					"bug"
				]
			},
			auth: {
				username: 'avrenproperties',
				password: process.env.githubpassword
			}
		}).then().catch(e => e);
	}
};
