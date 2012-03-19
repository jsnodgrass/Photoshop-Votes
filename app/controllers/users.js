var passport = require('passport');

var filters = require('../lib/filters');

/**
 * Users Controller
 */
 
exports = module.exports = {

  // Sign up form
  'new': [
    filters.is_user,
    function(req, res) {
      res.render('users/new');
    }
  ],

  // Sign up POST
  create: [ //passport.authenticate('local', { failureRedirect: '/users/new' }),
    function(req, res, next) {
      console.log(req.body)
      models.user.find_by_email(req.body, function(err, current_user) {
        if(current_user) {
          req.flash('error', 'That email already has an account!')
          res.redirect('/users/new');
        } else {
          var user = new models.user(req.body);
          console.log('user ----  ', user)
          user.save(function(err){
            if (err) {
              console.log(err);
              req.flash('error', err);
            }
            else {
              req.flash('info', "Account created. Welcome to the Skookum Photoshop Contest!");
            }
            res.redirect('/');
          });
        }
      })
    },    
  ],

  // Account edit form
  edit: [
    filters.require_self,
    function(req, res) {
      res.render('users/edit', {user: req.user});
    }
  ],

  // Account edit POST
  update: [
    filters.require_self,
    function(req, res) {

      if(req.files.avatar.size > 0) {
        req.body.avatar = req.files.avatar;
      }

      models.user.updateById(req.user._id, req.body, function(err, updated_user) {
        if (updated_user) {
          req.flash('info', 'Account updated');
        }
        else {
          req.flash('error', 'Unable to update user');
        }
        return res.redirect('/users/'+req.user._id);
      });
    }
  ],

  // User profile
  show: [
    filters.is_self,
    function(req, res) {
      res.render('users/show', {user: req.user, is_self: req.is_self, section: 'user'});
    }
  ],

  load: function(id, callback) {
    models.user.findById(id, callback);
  }
};