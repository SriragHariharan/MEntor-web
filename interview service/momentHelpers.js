const moment = require('moment');

const getDates = (type) => {
    const currentDate = moment();
    let dates = [];
    type = Number(type);
    if (type === 10) {
        for (let i = 0; i < 10; i++) {
        const date = moment().add(i, 'days');
        dates.push(new Date(date.format('YYYY-MM-DD')));
    }
    } else if (type <= 6) {
        for (let i = 0; i < 10; i++) { // 10 weeks = 1.5 months
        const date = moment(currentDate).add(i, 'weeks').day(type); // 0 = Sunday
        dates.push(new Date(date.format('YYYY-MM-DD')));
        }
    } else {
        return null;
    }
    return dates;
};

module.exports = getDates;