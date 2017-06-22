const net = require('net');

let socketConnections = [];

const server = net.createServer(socket => {
    
    socketConnections.push(socket);

    socket.on('data', d => {
        for (let i = 0; i < socketConnections.length; i++) {
            socketConnections[i].write(d);
        }
    });

    socket.on('end', () => {
        let i = socketConnections.indexOf(socket);
        socketConnections.splice(i, 1);
    });

}).on('error', err => {
    throw err;
});

server.listen(9000, () => {
    console.log('Server running %s', server.address().port);
});