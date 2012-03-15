var App = function(options, user) {
  options = options || {};
  user = user || {};

  //console.log(options)

  this.current_contests = ko.observableArray([]);
  this.all_current_contests = ko.observableArray([]);
  this.my_contests = ko.observableArray([]);
  this.future_contests = ko.observableArray([]);
  this.old_contests = ko.observableArray([]);

  this.has_current_contests = ko.dependentObservable(function(){
    return this.all_current_contests().length > 0;
  }, this)

  this.no_current_contests = ko.dependentObservable(function(){
    return this.all_current_contests().length < 1;
  }, this)

  this.has_old_contests = ko.dependentObservable(function(){
    return this.old_contests().length > 0;
  }, this)

  this.no_old_contests = ko.dependentObservable(function(){
    return this.old_contests().length < 1;
  }, this)

  this.loadContests(options, user);

}


App.prototype.addContest = function(contest,array) {
  array.push(new Contest(contest));
};

App.prototype.loadContests = function(options, user) {
  var self = this;
  var i;
  var starts;
  var ends;
  var now = new Date();
  for (var i = 0; i < options.length; i++) {
    starts = new Date(options[i].starts);
    if(options[i].expires) ends = new Date(options[i].expires);
    else ends = false;

    if(starts<now && (!ends || ends > now)) {
      self.addContest(options[i],self.all_current_contests);
    }

    if(options[i].owner._id === user._id) {
      self.addContest(options[i],self.my_contests);
    } else if(starts<now && (!ends || ends > now)) {
      self.addContest(options[i],self.current_contests);
    } else if(ends && ends < now) {
      self.addContest(options[i],self.old_contests);
    } else if(starts > now) {
      self.addContest(options[i],self.future_contests);
    }
    //console.log(ends)
  }
}
