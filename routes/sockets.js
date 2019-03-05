var player = require('play-sound')((opts = { player: 'cvlc' }));

module.exports = io => {
  io.on('connection', function(socket) {
    socket.on('sound:play', function(sound) {
      io.emit('sound:playing', { sound });

      player.play(
        './sounds/' + sound,
        { cvlc: ['--play-and-exit'] },
        function() {
          io.emit('sound:ended');
        }
      );
    });
  });
};
