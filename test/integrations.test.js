// setup environment
 
var $ = require('./setup').init();

// describe tests

vows.describe('integration tests').addBatch({
  'load test user' : {
    topic: function() {
      $.loadUser(this.callback);
    },
    'errors should be null': $.assertNull()
  },
  'load more users' : {
    topic: function() {
      $.moreUsers(this.callback);
    },
    'errors should be null': $.assertNull()
  }
}).addBatch({
  
  // test all routes that should not be accessible without being logged in
  'GET /contests with : no user': $.respondsWith('render', 'contests/index'),

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


