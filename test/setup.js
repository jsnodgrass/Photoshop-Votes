/**
 * Utility functions and vars use for testing
 *
 * @author Jim Snodgrass jim@skookum.com
 */


// Setup constructor
function Setup() {}


/**
 * initialize class
 */
Setup.prototype.init = function(options, callback) {
  this.options = options || {};
  
  this.now = new Date(new Date().toUTCString()).getTime();

  this.setGlobals();
  this.clearData();
  
  return this;
};


/**
 * Set some global object that the tests need
 */
Setup.prototype.setGlobals = function() {
  
  // Set test environment so app will choose test DB
  process.env.NODE_ENV = 'test';
  
  require('../app/app.js');

  vows = require('vows');
  assert = require('assert');
  Whisper = require('whisperjs');
  Whisper.init(server);
  
  // setup testing vars
  this.user1 = this.user2 = this.user3 = this.user4 = {};
  this.contest1 = this.contest2 = {};
  this.submission1 = this.submission2 = {};
  
  // setup some test user objects
  this.userData1    = { email: "bob@tester.com", password: 'pass123', name: 'Bob Tester', admin:true};
  this.userData2    = { email: "steve@tester.com", password: 'pass123', name: 'Steve'};
  this.userData3    = { email: "dan@tester.com", password: 'pass123', name: 'Dan'};
  this.userUpdate   = { email: "coolBob@tester.com", password: '9876pass', name: "Bob The Man" };

  // setup some test contest objects
  var start = new Date(),
      ends = start.setDate(start.getDate()+4)

  this.contestData1 = {name:'Test Contest', starts:start, expires:ends };
  
  // setup some test submissions
  this.submissionData1 = {name:'my submission'};  
    
  return false;
};


/**
 * Clear DB of any old test data
 */
Setup.prototype.clearData = function(callback) {
  var cb = function(){};
  for (var m in models)
    if (models[m].remove) models[m].remove().run(cb);
  return callback && callback() || false;
};

/**
 * Load new test data into DB
 */
Setup.prototype.loadUser = function(callback) {
  var self = this;

  self.user1 = new models.user(self.userData1);
  self.user1.save(function(err){
    self.contestData1.owner = self.user1._id;
    self.submissionData1.owner = self.user1._id;
    callback(err);
  });
};

Setup.prototype.loadContest = function(callback) {
  var self = this;

  self.contest1 = new models.contest(self.contestData1);
  self.contest1.save(function(err){
    self.submissionData1.contest = self.contest1._id
    callback(err);
  });
};

Setup.prototype.moreUsers = function(callback) {
  var self = this;

  var start = 2,
      stop = 4;

  for (var i=start; i < stop; i++) {
    self['user'+i] = new models.user(self['userData'+i]);
    self['user'+i].save(done);
  }

  var counter = 0;
  function done(err) {
    counter++;
    if (err) return callback(err);
    if (counter == stop - start) return callback(null);
  }
};


/**
 * Sets up a vow test context to send a request to a specified path
 * and then tests the expected response type
 *
 * @param {String} type   The expected result type
 * @return {Object} a context object to be passed into a vow test
 */
Setup.prototype.respondsWith = function(expected_type, expected_view, options) {
    options = options || {};
    var context = {
        topic: function () {
            // Get the current context's name, such as "POST /"
            // and split it at the space.
            var name   = this.context.name.split(/ +/), // ["POST", "/"]
                method = name[0].toUpperCase(),         // "POST"
                path   = name[1];                       // "/"
            
            Whisper.makeRequest({method: method, path: path, user: options.user, body:options.body}, this.callback);
        }
    };

    context['should have response type of: ' + expected_type + ' to ' + expected_view] = this.assertResponse(expected_type, expected_view);
    return context;
};

Setup.prototype.assertResponse = function(expected_type, expected_view) {
  return function(err, type, view, props) {
    assert.equal(type, expected_type);
    assert.equal(view, expected_view);
  };
};

Setup.prototype.assertNull = function() {
  return function(err) {
    if (typeof err == 'undefined') err = null;
    assert.isNull(err);
  };
};


// export class as module
exports = module.exports = new Setup();

