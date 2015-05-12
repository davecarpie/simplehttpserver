var fs = require('fs')
var http = require('http')

var serverDirectory = process.argv[2]

var server = http.createServer(function(req, res) {
  fs.readdir(serverDirectory, function(err, files) {
    if (err) {
      return res.end("Error loading files")
    }

    files.forEach(function(fileName) {
      if (fileName.charAt(0) !== ".")
        res.write(fileName + "\n");
    })

    return res.end()

  })
});

server.listen(5000)