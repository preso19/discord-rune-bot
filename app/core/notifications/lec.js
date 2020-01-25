const axios = require('axios');
const discord = require('discord.js');
const {panda_score} = require('./../../../config/api/urls');
const {panda_score_token} = require('./../../../config/api/tokens');

let notification = {
  checkEvery: 1, //minute
  channel: 'lec',

  callback: async function(channel) {
    let {data} = await axios.get(panda_score.base + panda_score.leagues.lec, {params: {token: panda_score_token}});

    let match = data[0];

    if (new Date(new Date(match.begin_at).getTime() - 1000 * 60 * 5).getMinutes() === 55) {
      let embed = new discord.RichEmbed()
        .setTitle(`${match.name} starts in 5 minutes!`)
        .setAuthor(match.league.name, match.league.image_url);

      channel.send(embed);
    }
  },
};

module.exports = {notification};
