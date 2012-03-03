var passport = require('passport');

var filters = require('../lib/filters');

/**
 * Admin Controller
 */
 
exports = module.exports = {

  show: [ filters.is_admin,
    function(req,res){
      //console.log(req.currentUser._id);
      var now = new Date();
      var user = {_id:req.currentUser._id,name:req.currentUser.name}
      models.user.find().run(function(err, users){
        models.contest.find().populate('owner',['name']).run(function(err,contests){
          models.contest.find().where('starts').$gt(now).desc('expires').run(function(err,future_contests){
            res.render('admin/show', {users:users, user:user, contests:contests, future_contests:future_contests});
          })
        })
      })
    }  
  ],

  update: [ filters.is_admin,
    function(req,res) {
      if(!req.body.data) res.send({code:500,data:'not authorized'});

      var change = req.body.data;
      var return_data = {};
      models.user.find_by_email({email:req.body.email}, function(err, user) {
        if(!user || err) {
          res.send({code:500, data:err});
        } else {
          if(change === 'admin') {
            user.admin = !user.admin;
            return_data = {change:user.admin}
          }
          if(change === 'contest_admin') {
            user.contest_admin = !user.contest_admin;
            return_data = {change:user.contest_admin}
          }

 
          user.save(function(err) {
            if(err) res.send({code:500, data:err});
            res.send({code:200, data:return_data});
          })
        }
      })
    }
  ]
};