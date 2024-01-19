var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/route', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/cool', function(req, res, next) {
  res.send('No es el más rico el que más tiene sino el que menos necesita');
});



module.exports = router;
