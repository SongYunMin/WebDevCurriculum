const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    let _url = req.url;
    let query = url.parse(_url,true).query; // TODO : URL 에서 Parse해서 문제인
    let pathname = url.parse(_url, true).pathname;
    res.writeHead(200,{'Content-Type' : 'text/plain'});
    if(pathname === '/'){
        res.end('Hello World!\n');
    }
    else if(pathname === '/foo' && req.method === 'GET'){
        res.end("Hello, " + query.bar);
    }
    else if (pathname === '/foo' && req.method === 'POST'){
        res.end("Hello, " + query.bar);
    }
}).listen(8080,function(){
    console.log("Connect Server");
});
/*
* https://javafa.gitbooks.io/nodejs_server_basic/content/chapter5.html
* */

