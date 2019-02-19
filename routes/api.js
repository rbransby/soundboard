var express = require('express');
var router = express.Router();
var player = require('play-sound')((opts = {player:'omxplayer'}));

/* GET users listing. */
router.post('/playsound', function(req, res, next) {
  console.log(req);
  player.play('./sounds/' + req.body.sound, {omxplayer: ['-o', 'alsa:bluealsa']}, function(err) {
    if (err) {
      res.json({ played: false });
      throw err;
    }

    res.json({ played: true });
  });
});

module.exports = router;
