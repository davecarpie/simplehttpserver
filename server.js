var fs = require('fs')
var http = require('http')

var server = http.createServer(function(req, res) {
  res.end("Test server is running")
});

server.listen(5000)