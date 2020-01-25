module.exports = {
    capitalizeFirstLetter: string => {
        return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
    },

    ifSameDateTime: (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear()
            && date1.getMonth() === date2.getMonth()
            && date1.getDate() === date2.getDate()
            && date1.getHours() === date2.getHours()
            && date1.getMinutes() === date2.getMinutes()
        );
    },
};
