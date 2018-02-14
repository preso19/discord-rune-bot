module.exports = async commands => {
    let random = (Math.floor(Math.random() * 200) + 1) - (Math.floor(Math.random() * 200) + 1);

    return "https://xkcd.com/" + random + "/info.0.json";
};