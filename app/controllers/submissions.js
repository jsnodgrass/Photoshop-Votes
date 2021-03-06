var passport = require('passport');

var filters = require('../lib/filters');

/**
 * Submissions Controller
 */
 
exports = module.exports = {

  show: [
    function(req,res){
      //console.log(req.currentUser._id);
      models.contests.find().run(function(err, contests){
        res.render('submissions/show', {contests:contests, user:req.currentUser});
      })
    }  
  ],

  create: [ filters.require_user,
    function(req, res) {
      if(!req.files.submission)
        res.redirect('/')
      
      var contest_id = req.params.contest_id;
      if(!req.files.submission.size > 0) {
        req.flash('error', 'You did not select an image. Please try again!');
        res.redirect('/contests/'+contest_id);
      } else {
        req.body.image = req.files.submission;
        var submission =  new models.submission(req.body);
        submission.owner = req.currentUser;
        submission.contest = contest_id;
        submission.save(function(err){
          if(err) {
            req.flash(err);
            res.redirect('/');
          }
          else {
            setTimeout(function(){
              res.redirect('/contests/'+contest_id);
            },750)
          }
        })
      }
    }
  ],

  update: [ filters.require_user,
    function(req,res) {
      var sub_id = req.body.id;
      var user_id = req.currentUser._id+'';
      models.submission.findById(sub_id, function(err, submission) {

          if(err) res.send ({err:err, code:500});
          else {
            if(_.contains(submission.voters,user_id) === false) {
              if(!submission.votes) submission.votes = 0;
              submission.votes = submission.votes+1;
              submission.voters.push(user_id);

              submission.save(function(err) {
                if(err) res.send ({err:err, code:500});
                else res.send({code:200, votes:submission.votes})
              });

            } else {
              res.send({code:500,err:"You can only vote for each submission once!"});
            }
          }

      })
    }
  ]
};