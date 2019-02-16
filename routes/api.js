var express = require('express');
var router = express.Router();
var player = require('play-sound')((opts = {}));

/* GET users listing. */
router.post('/playsound', function(req, res, next) {
  player.play('./sounds/' + req.body.sound, function(err) {
    if (err) {
      res.json({ played: false });
    }
  });

  res.json({played: true});
});

module.exports = router;
