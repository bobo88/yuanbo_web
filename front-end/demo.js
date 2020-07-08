const http = require('http');
const fs = require('fs');
const hostname = '172.18.112.167';
// const hostname = '101.201.198.201';
const port = 80;
const server = http.createServer((req, res) => { 
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World\n');
    var readStream = fs.createReadStream(__dirname + '/index.html', 'utf-8');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    readStream.pipe(res); // 管道方式发送 html 内容到客户端
}); 

server.listen(port, hostname, () => { 
    console.log(`Server running at http://${hostname}:${port}/`);
});