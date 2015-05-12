var fs = require('fs')

// parameters: 
// The path of the file that we need to be checking
// A call back that takes two arguments
//  * The first argument is an error if the file doesn't exist or there was an error determinging its type
//  * The second argument is true if the given path leads to a file or false if it leads to a directory
module.exports = function(path, callback) {
  fs.exists(path, function(exists) {
    if (!exists) {
      return callback("Path doesn't exist on disk: " + path, null)
    }

    fs.stat(path, function(err, stats) {
      if (err) {
        console.log(err)
        return callback(err, null)
      }

      if (stats.isFile()) {
        return callback(null, true)
      } else {
        return callback(null, false)
      }
    })
  })
}