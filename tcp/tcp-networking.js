// Chat server using net module

const server = require('net').createServer();

let socketsCounter = 0;
let sockets = {};

const currentTimestamp = () => {
    const now = new Date();
    return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
};

server.on('connection', socket => {
    socket.id = socketsCounter++;

    console.log('Client connected!');
    console.log(`Total sockets: ${socketsCounter}`);

    socket.write('Please type your name: \n');
    
    socket.on('data', data => {
        if (!sockets[socket.id]) {
            socket.name = data.toString().trim();
            socket.write(`Welcome, ${socket.name}!\n`);
            sockets[socket.id] = socket;
            return;
        }

        Object.entries(sockets).forEach(([key, currentSocket]) => {
            if (socket.id == key) return;

            currentSocket.write(`${socket.name} [${currentTimestamp()}] : `);
            currentSocket.write(data);
        });
    });

    // socket.setEncoding('utf8');

    socket.on('end', () => {
        delete sockets[socket.id];
        console.log('Client disconnected!');
        socketsCounter--;
    });
});

server.listen(9000, () => console.log(`Running on ${server.address().port}`));