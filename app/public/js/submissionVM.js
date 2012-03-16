var Submission = function(options, container) {
  options = options || {};
  this.container = container || {};
  //console.log(this.container.user)

  this.id = ko.observable(options._id);
  this.name = ko.observable(options.name);
  this.thumbs = ko.observable(options.image[0].square);
  this.image = ko.observable(options.image[0].path);
  this.vote_count = ko.observable(options.votes || 0);
  this.owner_name = ko.observable(options.owner.name);
  this.upload = ko.observable(options.updated_at);

  this.votes = ko.dependentObservable(function() {
    return 'Votes ' + this.vote_count();
  }, this)

  this.can_vote = ko.dependentObservable(function() {
    var now = new Date();
    var starts = new Date(container.contest_start());
    if(container.contest_end()) var ends = new Date(container.contest_end());
    return starts < now && (!ends || ends > now);
  },this) 

  this.show_details = ko.dependentObservable(function(){
    var now = new Date();
    if(container.contest_end()) var ends = new Date(container.contest_end());
    return ends && ends < now;    
  },this)

  this.uploaded = ko.dependentObservable(function(){   
      var returnDate = new Date(this.upload());
      var year = returnDate.getFullYear();
      var month = returnDate.getMonth()+1
      var day = returnDate.getDate();
      returnDate = month+'/'+day+'/'+year;
      return "on "+returnDate;
  },this)

  this.submitted = ko.dependentObservable(function(){
    return "Submitted by " + this.owner_name();
  },this)

  this.socket = io.connect('/');
  var self = this;
  this.socket.on('vote_count', function (data) {
     //console.log(data);
    if(data.id === self.id()) self.vote_count(data.votes);
  });
  
};

Submission.prototype.voteHandler = function(){ 
  var self = this;
  
  $.ajax({
    url: '/submissions',
    type: 'put',
    data: {id:self.id()},
    success: function(data){
      if(data.code === 200) {
        //console.log(data);
        self.socket.emit('vote',{'id':self.id()})
        self.vote_count(data.votes);
        $(".fullsize").fadeOut();
        $("div.popup_background").fadeOut();
      } else {
        alert(data.err);
      }
    }
  })
};

