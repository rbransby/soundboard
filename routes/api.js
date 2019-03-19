var express = require('express');
var router = express.Router();
var player = require('play-sound')((opts = { player: 'cvlc' }));
var path = require('path');

/* GET users listing. */
router.post('/playsound', function(req, res, next) {
  console.log(path.join(__dirname,'..','sounds',req.body.sound));
  player.play(
    path.join(__dirname,'..','sounds',req.body.sound),
    { cvlc: ['--play-and-exit'] },
    function(err) {
      if (err) {
        res.json({ played: false });
        throw err;
      }

      res.json({ played: true });
    }
  );
});

module.exports = router;
