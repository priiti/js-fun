const fs = require('fs');
const server = require('http').createServer();
const data = { "person": "Priit" };

server.on('request', (req, res) => {
    console.log(req.url);
    const { url } = req;

    switch (url) {
        case '/api':
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
            break;
        case '/home':
        case '/product':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(fs.readFileSync(`./views/${url}.html`));
            break;
        case '/':
            res.writeHead(301, { 'Location': '/home' });
            res.end();
        default:
            res.writeHead(404);
            res.end();
            break;
    }

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, world!\n');
});

server.listen(8000, () => console.log(`Running on ${server.address().port}`));