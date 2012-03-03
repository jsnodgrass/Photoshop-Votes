
var im = require("imagemagick");

var File = new server.mongoose.Schema({
  path      : { type: String },
  square    : { type: String },
  type      : { type: String },
  size      : { type: Number }
});

// Plugins

File.plugin(models.plugins.timestamps);
File.plugin(models.plugins.whitelist);

// setter

File.path('path').set(function(path) {

 var self = this,
      basename = require('path').basename(path).split(".");
  var ext;
  if(basename.length>1) {
  // remove extension as all will be saved as jpg
    ext = basename.pop().toLowerCase();
    if(ext !== 'png' && ext !== 'gif') ext = 'jpg';
  } else {
    ext = 'jpg';
  }

  // fullsize
  var filename = basename.join(".")+"."+ext;
  var dest = '/uploads/'+filename;

  // square crop for thumbnails
  var filename_square = basename.join(".")+'_square.'+ext;
  var dest_square = '/uploads/'+filename_square;
  self.square = dest_square;

  async.parallel({
    full: function(callback){
      im.resize({
        srcPath: path,
        dstPath: server.set('public') + dest,
        width: 1200,
        height: 800},
        callback);
    },
    crop: function(callback){
      im.crop({
        srcPath: path,
        dstPath: server.set('public') + dest_square,
        gravity: "NorthWest",
        width: 175,
        height: 175},
        callback);
    }
  },
  function(err, results) {
  });
  return dest
});


module.exports = File;
