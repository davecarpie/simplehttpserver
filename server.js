var fs = require('fs')
var http = require('http')
var url = require('url')

var serverDirectory = process.argv[2]

var server = http.createServer(function(req, res) {
  var reqUrl = url.parse(req.url)
  console.log(reqUrl)

  fs.readdir(serverDirectory, function(err, files) {
    if (err) {
      return res.end("Error loading files")
    }

    res.write("<h1>Contents of " + serverDirectory + "</h1><hr /><ul>")

    files.forEach(function(fileName) {
      if (fileName.charAt(0) !== ".") {
        filePath = reqUrl.path + fileName
        res.write("<li><a href=\"" + filePath + "\">" + fileName + "</a></li>");
      }
    })

    return res.end("</ul><hr />")

  })
});

server.listen(5000)