var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.params);
  res.render('demo', { title: 'Lumanote', page: "0", dis: "inherit" });
});


router.get('/app', function(req, res, next){
  res.render('demo', { page: "3", dis: "none" })
});

module.exports = router;
