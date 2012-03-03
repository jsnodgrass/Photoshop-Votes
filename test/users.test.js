// setup environment
 
var $ = require('./setup').init();

// describe tests

vows.describe('users model test').addBatch({
  'list all users' : {
    topic: function() {
      models.user.find().run(this.callback);
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
  'create new user with no info' : {
    topic: function() {
      var user = new models.user();
      user.save(this.callback);
    },
    'should return errors on email, name, and password fields': function(err, result) {
      assert.isNotNull(err);
      assert.isObject(err.errors.email);
      assert.isObject(err.errors.name);
      assert.isObject(err.errors.password);
    }
  },
  'create new user with bad email' : {
    topic: function() {
      var user = new models.user({name:'john',email:'j@jj.o',password:"123asd"});
      user.save(this.callback);
    },
    'should return errors on email, name, and password fields': function(err, result) {
      //console.log('------ ',err)
      assert.isNotNull(err);
      assert.isObject(err.errors.email);
    }
  }
}).addBatch({
  'check to make sure there are no users' : {
    topic: function() {
      models.user.find().run(this.callback);
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
  'add a user with correct data' : {
    topic: function() {
      var user = new models.user($.userData1);
      user.save(this.callback)
    },
    'errors should be null': function(err, result) {
      assert.isNull(err);
    }
  }
}).addBatch({
  'check to make sure the user was inserted' : {
    topic: function() {
      models.user.find().run(this.callback);
    },
    'errors should be null': function(err, result) {
      assert.isNull(err);
    },
    'result should be array with zero length': function(err, result) {
      assert.typeOf(result, 'array');
      assert.equal(result.length, 1);
      assert.equal(result[0].name, $.userData1.name)
      assert.equal(result[0].email, $.userData1.email)
      $.user1 = result;
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


