var passport = require('passport');

var filters = require('../lib/filters');

/**
 * Submissions Controller
 */
 
exports = module.exports = {

  index: [ 
    function(req,res){
      //console.log(req.currentUser._id);
      var now = new Date();
      models.contest.find().where('starts').$lte(now).$or([{'expires':{$gt:now}},{'expires':''}]).run(function(err,current){
        models.contest.find().where('expires').$lt(now).desc('expires').run(function(err,contests){
          //console.log(contests)
          res.render('contests/index', {current_contests:current, contests:contests, user:req.currentUser});
        })
      })
    }  
  ],

  show: [
    function(req,res){
      //console.log(new Date());
      models.contest.findOne().where('_id', req.params.contest_id).run(function(err, contest) {
        res.render('contests/show', {contest:contest, user:req.currentUser});
      })
    }  
  ],

  admin: [ filters.is_contest_admin,
    function(req,res){
      //console.log(req.currentUser._id);
      var now = new Date();
      var user = {_id:req.currentUser._id,name:req.currentUser.name}
      models.contest.find().where('owner', user._id).populate('owner',['name']).run(function(err,contests){
        res.render('contests/admin', {user:user, contests:contests});
      })
    }  
  ],

  create: [ filters.require_user, filters.is_contest_admin,
    function(req,res) {
        var contest = new models.contest(req.body);
        if(!req.body.starts) {
          contest.starts = new Date();
        } else {
          contest.starts = new Date(req.body.starts);
        }

        if(req.body.expires) {
          contest.expires = new Date(req.body.expires);
        }

        contest.owner = req.params.user_id;
        contest.save(function(err) {
          if(err) req.flash(err);

          if(req.currentUser.admin) res.redirect("/admin");
          else res.redirect("/contests/admin")
       })
    }
  ],

  add_image: [ filters.require_user, filters.is_contest_admin,
    function(req, res) {
      //console.log(req.files)
      var contest_id = req.params.contest_id;
      if(req.files.image) {
        models.contest.findById(contest_id, function(err, contest) {
          if(err) req.flash(err)
          else {
            contest.files.push(req.files.image);
            contest.save(function(err) {
              if(err)req.flash(err)
            })
          }
          setTimeout(function() {
            if(req.currentUser.admin) res.redirect("/admin");
            else res.redirect("/contests/admin");
          },750)

        })
      }
    }
  ],

  update: [ filters.require_user, filters.is_contest_admin,
    function(req, res) {
      var contest_id = req.params.contest_id;
      models.contest.findById(contest_id, function(err, contest) {
        if(err) res.send({code:500,data:err})
        else {
          _.extend(contest, req.body)
          contest.save(function(err) {
            if(err) res.send({code:500,data:err})
            else {
              var data = {name:contest.name,description:contest.description,expires:contest.expires}
              res.send({code:200, data:data})
            }
          })
        }
      })
    }
  ],

  delete_file: [ filters.require_user, filters.is_contest_admin,
    function(req, res) {
      var contest_id = req.params.contest_id;
      var file_id = req.params.file_id+'';
      models.contest.findById(contest_id, function(err, contest) {
        if(err) res.send({code:500, data:err},500);
        else {

          contest.files.id(file_id).remove();
          contest.save(function(err){
            if(err) res.send({code:500, data:err},500)
             res.send({code:200, data:contest},200);
          })
        }
      })
    }
  ]
};
