const schedule = require('./../../static/worlds19schedule');

let notification = {
	start: new Date(2019, 9, 12),
	end: new Date(2019, 10, 12),
	checkEvery: 1, //minutes

	callback: function(channel) {
		if (!notification.isTimeRangeValid()) {
			return false;
		}

		let now = new Date();
		let today = now.getDate() + '/' + (now.getMonth() + 1);

		let matches = schedule.filter(match => match.date === today);

		matches.forEach(match => {
			let start = match.time + 13;

			if (now.getHours() + 1 === start && now.getMinutes() === 17) {
				channel.send('<:worlds:632631650878226442> 🏆 ' + match.title + ' is starting in 5 minutes! <:POGGERS:524366532155801601>');
			}
		});
	},

	isTimeRangeValid: function() {
		let today = new Date();
		return today > notification.start && today < notification.end;
	},
};

module.exports = {notification};
