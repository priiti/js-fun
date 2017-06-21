const fs = require('fs');

const getCurrentTimeAndDate = () => {
    // Time
    let hours = (new Date()).getHours();
    hours = (hours < 10 ? '0' : '') + hours;
    let minutes = (new Date()).getMinutes();
    minutes = (minutes < 10 ? '0' : '') + minutes;
    let seconds = (new Date()).getSeconds();
    seconds = (seconds < 10 ? '0' : '') + seconds;

    // Date
    let year = (new Date()).getFullYear();
    let month = (new Date()).getMonth() + 1;
    month = (month < 10 ? '0' : '') + month;
    let day = (new Date()).getDate();
    day = (day < 10 ? '0' : '') + day;

    return `Time: ${hours}:${minutes}:${seconds} | Date: ${day}.${month}.${year} |`;

};

const myMessagePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Tere, Priit!');
    }, 200);

    setTimeout(() => {
        reject(`Could not handle message!`);
    }, 1);
});

myMessagePromise
    .then(data => console.log(data))
    .catch(error => {
        errorHandler(error);
    });

const errorHandler = error => {
    const errorMesssage = `${getCurrentTimeAndDate()} Error: ${error}`;
    const [ time, date ] = getCurrentTimeAndDate().split('Date: ');
    const fileName = `log-file-${date}.txt`;

    fs.appendFile(fileName, `${errorMesssage}\n`, 'utf8', err => {
        if (err) throw err;
    });
};