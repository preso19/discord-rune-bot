/*
  A ping pong bot, whenever you send "ping", it replies "pong".
*/

// Import the discord.js module
const Discord = require('discord.js');
const axios = require('axios');

// Create an instance of a Discord client
const client = new Discord.Client();

// The token of your bot - https://discordapp.com/developers/applications/me
const token = 'Mzg4Mzk2OTg5OTc4NjQwMzg0.DQsafg.X8CnrHDkt6ly5QXLOTT0FJhXF64';

// The ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {

  var messageParts = message.content.split(' ');

  if ( messageParts[0] === '/data' ) {

    var acoountInfoUrl = 'https://eun1.api.riotgames.com/lol/summoner/v3/summoners/by-name/' + messageParts[1] + '?api_key=RGAPI-9d4c9630-4ac8-4fbf-910e-5c7f3536df83';

	axios.get( acoountInfoUrl )
	.then( (response) => {
	    message.channel.send( 'Your level is ' + response.data.summonerLevel );

		var accountId = response.data.accountId;
	    var acoountInfoUrl = 'https://eun1.api.riotgames.com/lol/match/v3/matchlists/by-account/' + accountId + '/recent?api_key=RGAPI-9d4c9630-4ac8-4fbf-910e-5c7f3536df83';

	    axios.get( acoountInfoUrl )
		.then( (maches) => {
			console.log(JSON.stringify(maches.data));
		})
		.catch( (error) => {
		    message.channel.send( 'Spasa naeba neshto. Probvai pak!!!' );
		});
	})
	.catch( (error) => {
	    message.channel.send( 'Spasa naeba neshto. Probvai pak!!!' );
	});
  }
});

// Log our bot in
client.login(token);