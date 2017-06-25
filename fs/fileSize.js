const fs = require('fs');

const fileSize = (filename, cb) => {
    if (typeof filename !== 'string') {
        return process.nextTick(
            cb, 
            new TypeError('Argument should be a string!')
        );
    }

    fs.stat(filename, (err, stats) => {
        if (err) return cb(err);

        cb(null, stats.size);
    });
}

fileSize(__filename, (err, size) => {
    if (err) throw err;

    console.log(`Size in KB: ${size/1024}`);
});

console.log('Hello');