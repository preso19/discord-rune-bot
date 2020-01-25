let fs = require('fs');
let notificationsPath = './app/core/notifications/';
const {log} = require('./handle');

module.exports = {
	execute: channels => {
		fs.readdirSync(notificationsPath).forEach(notificationFile => {
			let notification = require('./notifications/' + notificationFile).notification;

			if (typeof notification.callback !== 'function') {
				log('Notification ' + notificationFile + ' does not have valid callback.');
				return false;
			}

			if (!isTimeRangeValid(notification)) {
				return false;
			}

			let channel = getChannel(notification, channels);

			notification.callback(channel);
			setInterval(_=>{notification.callback(channel)}, notification.checkEvery * 1000 * 60);
		});
	},
};

function isTimeRangeValid(notification) {
	if (typeof notification.start == 'undefined' || typeof notification.end == 'undefined') {
		return true;
	}

	let today = new Date();
	return today > notification.start && today < notification.end;
}

function getChannel(notification, channels) {
	if (typeof notification.channel !== 'string' || typeof channels[notification.channel] !== 'object') {
		return channels['default'];
	}

	return channels[notification.channel];
}
