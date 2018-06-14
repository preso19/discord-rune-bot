const axios = require('axios');

module.exports = async commands => {
	let {world_cup_url} = require('./../../../config/api/urls/');
	let today = new Date();
	let games = [];
	let result = [];

	return await axios.get(world_cup_url).then(response => {
		response.data.rounds.map(e => {
			e.matches.map(el => {
				let date = new Date(el.date);

				if (today.getDate() === date.getDate() && today.getMonth() === date.getMonth()) {
					games.push(el);
				}
			});
		});

		games.map(game => {
			// set timezone to match bulgarian's
			let difference = 3 - Number(game.timezone.substring(4));
			let time = Number(game.time.substring(0, 2)) + difference;

			result.push(game.team1.name + " vs. " + game.team2.name + " - " + time + ":00");
		});

		return result.join('\n');
	}).catch(error => {
		log(path.dirname(__filename) + "/" + path.basename(__filename) + " - " + error);
		return "Unexpected error.";
	});
};
