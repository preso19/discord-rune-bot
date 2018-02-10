const axios = require('axios');
const path = require("path");
const {reddit_url} = require('./../../../config/api/urls/');
const {log} = require('./../handle');

module.exports = async commands => {
    if (commands.length < 3) {
        return "Wrong syntax.\n\n`/r <subreddit name> <count>`";
    }

    let count = Number(commands[2]);

    if (isNaN(count) || count < 1 || count > 5) {
        return "Wrong syntax.\n\n`/r <subreddit name> <count (1 to 5)>`";
    }

    let subreddit = commands[1];
    let url = reddit_url + "/r/" + subreddit + ".json";
    let articles = [];
    let currentPost = '';
    let link = '';

    return await axios.get(url).then(response => {
        for (let i = 0, y = 0; i < count; i++) {
            currentPost = response.data.data.children[i].data;

            if (currentPost.stickied === true) {
                count++;
                continue;
            }

            y++;
            link = currentPost.permalink;

            articles[i] = '#' + y + ': ' + currentPost.title + '\nLink: ' + reddit_url + link;
        }

        return "**Top " + commands[2] + " posts from " + subreddit + ":**\n" + articles.join("\n");
    }).catch(error => {
        log(path.dirname(__filename) + "/" + path.basename(__filename) + " - " + error);
        return "The subreddit was not found.";
    });
};