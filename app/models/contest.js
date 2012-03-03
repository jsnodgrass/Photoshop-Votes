var skookum = require('../lib/mongoose-skookum');

/**
 * Contest model to interact with contest collection in mongo using the Mongoose ORM
 *
 * 
 */

var Contest = new server.mongoose.Schema({
  owner             : { type: server.mongoose.Schema.ObjectId, ref: 'User', required:true },
  name              : { type: String, trim: true, required:true },
  files             : [ models.schemas.asset_attachment ],
  description       : { type: String, trim: true },
  starts            : { type: Date, required:true },
  expires           : { type: Date },
  comments          : [],
  submissions       : [],
  voters            : [],
  is_archived       : { type: Boolean }
});

// Plugins

Contest.plugin(skookum.plugins.timestamps);

// Middleware

Contest.pre('init', function(next, data) {
  var self = this;
  models.submission.find({'contest':data._id}).desc("votes").populate('owner',['name']).run(function(err, submissions) {
    data.submissions = submissions;
    next();
  })
})

// Export

module.exports = server.mongoose.model('Contest', Contest);


