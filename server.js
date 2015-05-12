var fs = require('fs')
var http = require('http')

var server = http.createServer(function(req, res) {
  fs.readdir(".", function(err, files) {
    if (err) {
      return res.end("Error loading files")
    }

    files.forEach(function(fileName) {
      res.write(fileName + "\n");
    })

    return res.end()

  })
});

server.listen(5000)