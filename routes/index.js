var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir('./sounds/', (err, files) => {
    res.render('index', { title: 'Stonecutters Soundboard', files: files });
  });
});

module.exports = router;
