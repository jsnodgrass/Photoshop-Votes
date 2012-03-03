var skookum = require('../lib/mongoose-skookum');

/**
 * User model to interact with users collection in mongo using the Mongoose ORM
 *
 * @author Jim Snodgrass <jim@skookum.com>
 */

var User = new server.mongoose.Schema({
  email         : { type: String, index: true, required: true, lowercase: true, trim: true, unique: true, validate: [skookum.validators.email, 'not valid'] },
  name          : { type: String, trim: true, required: true },
  about         : { type: String, trim: true },
  avatar        : [ models.schemas.attachment ],
  admin         : { type: Boolean,'default': false },
  contest_admin : { type: Boolean,'default': true }
}, {strict: true});

// Plugins

User.plugin(skookum.plugins.password, { required: true });
User.plugin(skookum.plugins.timestamps);
User.plugin(skookum.plugins.crud);

// Statics

User.statics.find_by_email = function(props, callback) {
  this.findOne({email:props.email.toLowerCase()}, function(err, user){
    if(user && !err){
      return callback(undefined, user);
    } else {
      return callback("Unable to find user");
    }
  });
};

// Export

module.exports = server.mongoose.model('User', User);


