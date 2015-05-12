var fs = require('fs')
var http = require('http')
var url = require('url')

var baseDirectory = process.argv[2]

var server = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url)
  console.log(urlObj)
  var dirPath = baseDirectory + urlObj.path

  fs.readdir(dirPath, function(err, fileNames) {
    if (err) {
      return res.end("Error loading files")
    }

    res.write("<h1>Contents of " + dirPath + "</h1><hr /><ul>")

    var folders = []
    var files = []

    fileNames.forEach(function(fileName) {
      if (fileName.charAt(0) !== ".") {
        var fileStat = fs.statSync(dirPath+fileName)
        if (fileStat.isDirectory()) {
          folders.push(fileName + "/")
        } else {
          files.push(fileName)
        }
      }
    })

    folders.concat(files).forEach(function(fileName) {
      filePath =  urlObj.path + fileName
      res.write("<li><a href=\"" + filePath + "\">" + fileName + "</a></li>");
    })

    return res.end("</ul><hr />")

  })
});

server.listen(5000) 