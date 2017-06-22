const url = require('url');
const fs = require('fs');

const renderHtml = (path, res) => {
    fs.readFile(path, null, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.write('File not found!');
        } else {
            res.write(data);
        }
        res.end();
    });
};

exports.handleRequests = (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});

    const path = url.parse(req.url).pathname;

    switch (path) {
        case '/':
            renderHtml('./views/index.html', res);
            break;
        case '/register':
            renderHtml('./views/register.html', res);
            break;
        default:
            res.writeHead(404);
            res.write('Page not found!');
            res.end();
    }
};