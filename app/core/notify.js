let fs = require('fs');
let notificationsPath = './app/core/notifications/';
const {log} = require('./handle');

module.exports = {
	execute: channel => {
		let notifications = [];
		fs.readdirSync(notificationsPath).forEach(file => notifications.push(file));

		notifications.forEach(notificationFile => {
			let notification = require('./notifications/' + notificationFile).notification;

			if (typeof notification.callback !== 'function') {
				log('Notification ' + notificationFile + ' does not have valid callback.');
				return false;
			}

			if (!notification.isTimeRangeValid()) {
				return false;
			}

			notification.callback(channel);
			setInterval(_=>{notification.callback(channel)}, notification.checkEvery * 1000 * 60);
		});
	},
};
