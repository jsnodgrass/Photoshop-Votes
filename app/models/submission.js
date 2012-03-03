var skookum = require('../lib/mongoose-skookum');

/**
 * User model to interact with users collection in mongo using the Mongoose ORM
 *
 * @author Jim Snodgrass <jim@skookum.com>
 */

var Submission = new server.mongoose.Schema({
  owner             : { type: server.mongoose.Schema.ObjectId, ref: 'User', required:true },
  contest           : { type: server.mongoose.Schema.ObjectId, ref: 'Contest', required:true },
  name              : { type: String, trim: true, required:true },
  description       : { type: String, trim: true },
  image             : [ models.schemas.attachment ],
  comments          : [],
  votes             : Number
});

// Plugins

Submission.plugin(skookum.plugins.timestamps);

// Export

module.exports = server.mongoose.model('Submission', Submission);


