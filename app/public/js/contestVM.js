var Contest = function(options) {
  options = options || {};
  //console.log(options);

  this.id = ko.observable(options._id);
  this.name = ko.observable(options.name);
  this.submissions = ko.observableArray([]);
  this.starts = ko.observable(create_date(options.starts));
  this.contest_start = ko.observable(options.starts);
  this.contest_end = ko.observable(options.expires) || null;
  this.description = ko.observable(options.description);
  this.assets = ko.observableArray([]);
  this.owner = ko.observable(options.owner.name);

  //load other VM's
    for (var i = 0; i < options.submissions.length; i++) this.addSubmission(options.submissions[i]);
    for (var i = 0; i < options.files.length; i++) this.addAsset(options.files[i]);

  this.start_date = ko.dependentObservable(function(){
    if(this.starts()) {
      var returnDate = this.starts();
      var year = returnDate.getFullYear();
      var month = returnDate.getMonth()+1
      var day = returnDate.getDate();
      returnDate = month+'/'+day+'/'+year;
      return returnDate;
    } 
  }, this);

  this.when_ends = ko.dependentObservable(function(){
    if(this.contest_end()) {
      this.expires = ko.observable(create_date(this.contest_end()));
      var returnDate = this.expires();
      var year = returnDate.getFullYear();
      var month = returnDate.getMonth()+1
      var day = returnDate.getDate();
      var now = new Date();
      if(returnDate < now) returnDate = 'Contest Ended '+month+'/'+day+'/'+year;
      else returnDate = 'Contest Ends '+month+'/'+day+'/'+year;
      return returnDate;
    } else {
      return ""
    }
  }, this);

  this.end_date = ko.dependentObservable(function(){
      if(this.contest_end()) {
      this.expires = ko.observable(create_date(this.contest_end()));
      var returnDate = this.expires();
      var year = returnDate.getFullYear();
      var month = returnDate.getMonth()+1
      var day = returnDate.getDate();
      returnDate = month+'/'+day+'/'+year;
      return returnDate;
    } else {
      return ""
    }
  },this)

  this.submissions_sort = ko.dependentObservable(function() {
    return this.submissions().sort(this.sortFunction);
  }, this);

  this.current_contest = ko.dependentObservable(function() {
    var now = new Date();
    var starts = new Date(this.contest_start());
    if(this.contest_end()) var ends = new Date(this.contest_end());
    return starts < now && (!ends || ends > now);
  },this)

  this.future_contest = ko.dependentObservable(function() {
    var now = new Date();
    var starts = new Date(this.contest_start());
    return starts > now;
  },this)
  
  this.contest_over = ko.dependentObservable(function() {
    var now = new Date();
    var starts = new Date(this.contest_start());
    if(this.contest_end()) var ends = new Date(this.contest_end());
    return ends && ends < now;
  },this)

  this.has_submissions = ko.dependentObservable(function() {
    return this.submissions().length > 0;
  },this)

  this.url = ko.dependentObservable(function() {
    return "/contests/"+this.id();
  },this)

}

Contest.prototype.addSubmission = function(s) {
  this.submissions.push(new Submission(s, this));
};

Contest.prototype.addAsset = function(s) {
  this.assets.push(new Asset(s, this));
};

Contest.prototype.sortFunction = function(a, b) {
  return a.votes() < b.votes() ? 1 : -1;  
};

Contest.prototype.edit_contest = function() {
  var self = this;
  var parent = $("input[value='"+this.id()+"']").parent().parent();
  var info = {
    name:parent.find('input[name="name"]').val(),
    expires:parent.find('input[name="expires"]').val(),
    description:parent.find('textarea[name="description"]').val()
  }

  console.log(self.id())
  $.ajax({
    url: "/contests/update/"+self.id(),
    type:"put",
    data:info,
    success:function(data) {
      $(".modal,div.popup_background").fadeOut('fast');
      if(data.code !== 200) alert(data.data)
      else {
        self.name(data.data.name);
        self.description(data.data.description);
        self.contest_end(data.data.expires);
      }
    }
  })
}