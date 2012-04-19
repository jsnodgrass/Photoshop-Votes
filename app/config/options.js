exports = module.exports = function(env) {

  // Options
  
  var TWO_WEEKS = 14 * 24 * 60 * 60 * 1000;

  var option_tables = {
    development: function() {
      this.appTitle = 'PhotoshopVotes';
      this.appname = 'photoshopvotes';
      this.maxAge = TWO_WEEKS;
      this.shortSession = TWO_WEEKS;
      this.reqTimeout = 30000;
      this.sessionKey = 'ph0t0sh0p';
      this.host = 'http://localhost';
      this.port = 80;
      this.dumpExceptions = true;
      this.showStack = true;
      this.errorToHtml = true;
      this.redis = { host: 'localhost', port: 6379, db: this.appname };
      this.mongo = { db: 'mongodb://localhost/'+this.appname};
    },
    test: function() {
      this.mongo = { db: 'mongodb://localhost/'+this.appname+'_test' };
      this.redis = { host: 'localhost', port: 6379, db: this.appname +'_test' };
      this.port = 8000;
    },
    labs: function() {
      this.host = 'http://labs.skookum.com';
      this.port = 4000;
    },
    staging: function() {

    },
    production: function() {

    }
  };
  
  // Cascade options
  
  option_tables.test.prototype = new option_tables.development();
  option_tables.staging.prototype = new option_tables.development();
  option_tables.labs.prototype = new option_tables.development();
  option_tables.production.prototype = new option_tables.development();

  return new option_tables[env]();
  
};