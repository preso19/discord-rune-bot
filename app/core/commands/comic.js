module.exports = async commands => {
	let min = 1;
	let max = 1800;

    let random = Math.floor(Math.random() * (max - min + 1)) + min;

    return "https://xkcd.com/" + random + "/info.0.json";
};