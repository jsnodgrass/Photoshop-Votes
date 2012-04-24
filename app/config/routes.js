
exports = module.exports = function() {
  
  // 
  server.get('/', controllers.contests.index);
  server.resource(controllers.home);

  // Login Sessions
  server.get('/sessions/login', controllers.session['new']);
  server.post('/sessions', controllers.session.create);
  server.get('/sessions/logout', controllers.session['destroy']);
  // server.resource('sessions', controllers.session)
  //   .map('all', '/login', 'new')
  //   .map('all', '/logout', 'destroy');


  // Users
  server.get('/users/new', controllers.users['new']);
  server.post('/users', controllers.users.create);
  server.get('/users/:user', controllers.users.show);
  server.get('/users/:user/edit', controllers.users.edit);
  server.put('/users/:user', controllers.users.update);
  // server.resource('users', controllers.users);
  

  // Submissions
  server.post('/submissions/:contest_id', controllers.submissions.create);
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