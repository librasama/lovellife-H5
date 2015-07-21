var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'AUWorkshop' });
  express.query(req, res, next);
});
router.get('/game', function(req, res, next){
  res.render('game', {title:'宅喵喵游戏'});
  express.query(req, res, next);
});

router.get('/comic', function(req, res, next) {
  res.render('comic', { title: '听音乐' });
  express.query(req, res, next);
});

router.get('/', function (req, res, next) {
  
});


module.exports = router;
