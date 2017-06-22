const http = require('http');
const router = require('./router');

http.createServer(router.handleRequests).listen(9000, () => console.log('Running on 9000'));