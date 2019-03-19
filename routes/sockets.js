var Queue = require('better-queue');
var player = require('play-sound')((opts = { player: 'cvlc' }));
var path = require('path');

var soundPlayer = new Queue(
  ({ sound }, done) => {
    player.play(path.join(__dirname,'..','sounds',sound), { cvlc: ['--play-and-exit'] }, function() {
      done(null);
    });
  },
  {
    filter: (input, cb) => {
      const queue = getQueue(soundPlayer._store._tasks);

      if (queue.length >= 10) {
        return cb('not_allowed');
      }

      // if this connection has added a sound already then wait
      // const connnectionsSounds = queue.filter(
      //   x => x.connectionId === input.connectionId
      // );

      // if (connnectionsSounds.length >= 2) {
      //   input.socket.emit('tooManySounds');
      //   return cb('not_allowed');
      // } else {
      //   input.socket.emit('soundsAllowed');
      // }

      return cb(null, input);
    }
  }
);

const getRunning = running => {
  const first = running[Object.keys(running)[0]];

  return first[Object.keys(first)[0]];
};

const getQueue = q => {
  const queue = [];

  for (const key in q) {
    queue.push(q[key]);
  }

  return queue;
};

module.exports = io => {
  const sendQueue = func => {
    const queue = getQueue(soundPlayer._store._tasks);

    if (
      func === 'task_queued' &&
      soundPlayer._store._queue.length >= 1 &&
      Object.keys(soundPlayer._store._running).length >= 1
    ) {
      queue.unshift(getRunning(soundPlayer._store._running));
    }

    io.emit(
      'soundQueue',
      queue
        .filter(x => x !== false)
        .map(x => x.sound.substr(0, x.sound.lastIndexOf('.')))
    );
  };

  soundPlayer.on('task_queued', sendQueue.bind(null, 'task_queued'));
  soundPlayer.on('task_finish', sendQueue.bind(null, 'task_finish'));

  io.on('connection', function(socket) {
    socket.on('sound:play', function(sound) {
      soundPlayer.push({ sound, connectionId: socket.id, socket });
    });
  });
};
