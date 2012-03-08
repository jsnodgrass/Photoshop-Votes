
exports = module.exports = function() {
  
  // 
  server.get('/', controllers.contests.index);
  server.resource(controllers.home);

  // Login Sessions
  server.resource('sessions', controllers.session)
    .map('all', '/login', 'new')
    .map('all', '/logout', 'destroy');


  // Users
  server.resource('users', controllers.users);
  

  // Submissions
  server.post('/submissions/:contest_id', controllers.submissions.create);
  //server.get('/submissions', controllers.submissions.show);
  server.put('/submissions', controllers.submissions.update);

  // Contests
  
  server.get('/contests', controllers.contests.index);
  server.get('/contests/admin', controllers.contests.admin);
  server.post('/contests/:user_id', controllers.contests.create);
  server.get('/contests/:contest_id', controllers.contests.show);
  server.put('/contests/:contest_id', controllers.contests.add_image);
  server.put('/contests/update/:contest_id', controllers.contests.update);
  server['delete']('/contests/remove/:contest_id/:file_id', controllers.contests.delete_file);

  // Admin
  server.get('/admin', controllers.admin.show);
  server.put('/admin', controllers.admin.update);

  // route not found, send to error page
  server.all('*', controllers.home.error);
};