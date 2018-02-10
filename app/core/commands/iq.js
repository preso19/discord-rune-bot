module.exports = async commands => {
    let iq = (Math.floor(Math.random() * 200) + 1) - (Math.floor(Math.random() * 200) + 1);
    let name = commands[1];

    if (typeof name === "undefined") {
        return "IQ-to ti e " + iq;
    } else {
        return "IQ-to na " + name + " e " + iq;
    }
};