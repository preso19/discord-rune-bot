const axios = require('axios');
const path = require("path");
const {reddit_url} = require('./../../../config/api/urls/');
const {log} = require('./../handle');

module.exports = async commands => {
    if (commands.length < 3) {
        return "Wrong syntax.\n\n`/r <subreddit name> <count>`";
    }

    let subreddit = commands[1];
    let count = Number(commands[2]);
    let url = reddit_url + "r/" + subreddit + ".json";
    let articles = [];
    let currentPost = '';
    let link = '';

    return await axios.get(url).then(response => {
        for (let i = 0; i < count;) {
            currentPost = response.data.data.children[i].data;
            link = currentPost.permalink;
            articles[i] = '#' + ++i + ': ' + currentPost.title + '\nLink: ' + reddit_url + currentPost.permalink;
        }

        return "Top " + count + " posts from " + subreddit + ":\n" + articles.join("\n\n");
    }).catch(error => {
        log(path.dirname(__filename) + path.basename(__filename) + " - " + error);
        return "The subreddit was not found.";
    });
};