// setup environment
 
var $ = require('./setup').init();

// describe tests

vows.describe('contests model test').addBatch({
  'list all contests' : {
    topic: function() {
      models.contest.find().run(this.callback);
    },
    'errors should be null': function(err, result) {
      assert.isNull(err);
    },
    'result should be array with zero length': function(err, result) {
      assert.typeOf(result, 'array');
      assert.equal(result.length, 0);
    }
  }
}).addBatch({
  'load test user' : {
    topic: function() {
      $.loadUser(this.callback);
    },
    'result should be no errors' : function(err, result) {
      assert.isNull(err);
    }
  }
}).addBatch({
  'load test contest' : {
    topic: function() {
      $.loadContest(this.callback);
    },
    'result should be no errors' : function(err, result) {
      assert.isNull(err);
    }
  }
}).addBatch({
  'add submission with no data' : {
    topic: function() {
      var submission = new models.submission();
      submission.save(this.callback)
    },
    'result should be error' : function(err, result) {
      assert.isNotNull(err);
      assert.isObject(err.errors.name);
      assert.isObject(err.errors.owner);
      assert.isObject(err.errors.contest);
    }
  },
  'add submission with good data' : {
    topic: function() {
      var submission = new models.submission($.submissionData1);
      submission.save(this.callback)
    },
    'errors should be null' : function(err, result) {
      assert.isNull(err);
      assert.equal(result.name, $.submissionData1.name);
      assert.equal(result.owner, $.submissionData1.owner);
      $.submission1 = result;
    }
  }
}).addBatch({
  'find all contests' : {
    topic: function() {
      models.submission.find().run(this.callback);
    },
    'result should be no errors and 1 contest' : function(err, result) {
      assert.isNull(err);
      assert.typeOf(result, 'array');
      assert.equal(result.length, 1);
    }
  }
}).addBatch({
  'clear data' : {
    topic: function() {
      $.clearData(this.callback);
    },
    'errors should be null': function(err, result) {
      assert.isNull(err);
    }
  }
})['export'](module);


