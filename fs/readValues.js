const fs = require('fs');

// Keep callback calls and add Promise interface

const readFileAsArray = (file, cb = () => {}) => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) return reject(err);

            const rowValues = data.toString().trim().split('\n');
            resolve(rowValues);
        });
    });
};

readFileAsArray('./numbers.txt')
    .then(data => {
        const numbers = data.map(Number);
        const oddNumbers = numbers.filter(num => num % 2 === 1);
        console.log('Odd numbers count %d', oddNumbers.length);
    })
    .catch(console.error);

const countOdd = async () => {
    try {
        const rowValues = await readFileAsArray('./numbers.txt');
        const numbers = rowValues.map(Number);
        const oddNumbersCount = numbers.filter(num => num % 2 === 1).length;
        console.log('Odd numbers count is %d', oddNumbersCount);
    } catch (error) {
        console.error(error);
    }
};

countOdd();