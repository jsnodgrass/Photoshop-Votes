
var im = require("imagemagick");

var File = new server.mongoose.Schema({
  path      : { type: String },
  square    : { type: String },
  type      : { type: String },
  size      : { type: Number },
  name      : { type: String }
});

// Plugins

File.plugin(models.plugins.timestamps);
File.plugin(models.plugins.whitelist);

// setter

File.path('path').set(function(path) {

 var self = this,
      basename = require('path').basename(path).split("."),
      name = this.name.split("."),
      ext,
      ext2;

  // remove extension as all will be saved as jpg
    ext = ext2 = name.pop().toLowerCase();
    if(ext === 'psd' || ext === 'tif') ext2 = 'png';
    else if(ext !== 'png' && ext !== 'gif') ext2 = 'jpg';
    

  // fullsize
  var filename = basename.join(".")+"."+ext;
  var dest = '/uploads/'+filename;

  console.log(filename)
  var newpath = path+'.'+ext;

  // square crop for thumbnails
  var filename_square = basename.join(".")+'_square.'+ext2;
  var dest_square = '/uploads/'+filename_square;
  self.square = dest_square;

  async.parallel({
    full: function(callback){
      var fs = require('fs');
      fs.readFile(path, function(err,data) {
        if(err) console.log('error1 -- ', err);
        fs.writeFile(server.set('public') + dest, data, function(err) {
          if(err) console.log('error2 -- ', err);
        })
      })
    },
    crop: function(callback){
      if(ext === 'psd' || ext === 'tif') path = path+'[0]';
      im.crop({
        srcPath: path,
        dstPath: server.set('public') + dest_square,
        //gravity: "NorthWest",
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
