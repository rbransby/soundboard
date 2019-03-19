var express = require('express');
var path = require('path');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  fs.readdir(path.join(__dirname,'..','sounds'), (err, files) => {
    const replace = {};

    files.forEach(f => {
      replace[path.extname(f)] = '';
    });

    res.render('index', {
      title: 'Stonecutters Soundboard',
      files: files,
      replace: replace
    });
  });
});

module.exports = router;
