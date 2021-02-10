const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    let _url = req.url;
    let query = url.parse(_url,true).query;
    let pathname = url.parse(_url, true).pathname;
    res.writeHead(200,{'Content-Type' : 'text/plain'});
    if(pathname === '/'){
        res.end('Hello World!\n');
    }
    else if(pathname === '/foo' && req.method === 'GET'){
        res.end("Hello, " + query.bar);
    }
    else if (pathname === '/foo' && req.method === 'POST'){
        let serverData = '';
        req.on('data', (chunk) => {
            serverData += chunk;
            let resObj = JSON.parse(serverData);
            res.end("Hello, " + resObj.bar);
        });
    }
}).listen(8080, () =>{
    console.log("Connect Server");
});