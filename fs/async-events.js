const fs = require('fs');
const EventEmitter = require('events');

class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        console.time('execute');
        this.emit('begin');

        asyncFunc(...args, (err, data) => {
            if (err) return this.emit('error', err);

            this.emit('data', data);
            console.timeEnd('execute');
            this.emit('end');
        });
    }
}

const withTime = new WithTime();

withTime.on('data', data => console.log(`Length: ${data.length}`));

// Register uncaught exception handler into process
process.on('uncaughtException', err => {
    console.error(err);
});

withTime.on('begin', () => console.log('Starting executing...'));
withTime.on('end', () => console.log('Ending executing...'));

withTime.execute(fs.readFile, '');
withTime.execute(fs.readFile, __filename);