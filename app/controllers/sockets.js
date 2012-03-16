var filters = require('../lib/filters');

/**
 * Sockets
 */
// exports = module.exports = {

var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
  //socket.broadcast.emit('news', { hello: 'world' });
  socket.on('vote', function (data) {
    models.submission.findById(data.id, function(err, submission) {
      socket.broadcast.emit('vote_count', {votes:submission.votes, id:data.id})
    })
  });
});
  
// };
