var http = require('http');

var server = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello world on nodejs version " + process.version);
});

var port = process.env.PORT || 1337;
server.listen(port);
});
