const fs = require('fs');

const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};

const getCurrentDate = () => {
    const now = new Date();
    return `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
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
    const errorMesssage = `Time: ${getCurrentTime()}, Date: ${getCurrentDate()}, Error: ${error}`;

    const fileName = `log-file-${getCurrentDate()}.txt`;

    fs.appendFile(fileName, `${errorMesssage}\n`, 'utf8', err => {
        if (err) throw err;
    });
};