var express = require('express');
var router = express.Router();
var cardDao = require('../models/Card.js');
router.get('/', function(req, res, next){
    c = {};
    c.title = '卡组';
    c.teaminfo =
        [{'name':'Maki红', 'rel':'1', 'info':[{'img':'../images/1.jpg', 'level':'1'}, {'img':'../images/1.jpg', 'level':'2'}]},
            {'name':'Maki蓝', 'rel':'2', 'info':[{'img':'../images/2.jpg', 'level':'2'}, {'img':'../images/2.jpg', 'level':'2'}]},
            {'name':'Maki绿', 'rel':'3', 'info':[{'img':'../images/3.png', 'level':'3'}, {'img':'../images/3.png', 'level':'2'}]}
        ];
    res.render('card', c);
    express.query(req, res, next);
});

router.get('/upd', function(req, res, next){
    cardDao.upd({"card_noraml":"face_0019.png"},{"sp_01":"SBSB"},{}, function(doc){
       cardDao.find({"card_noraml":"face_0019.png"}, function(d) {
           console.log(d);
        });
    });
});

//初始化卡牌分类数组
router.get('/init', function(){
    var normal = [];
    var sr = [];
    var ur = [];
    var char = [];
});

router.post('/search', function(req, res, next){
    var param = req.body;
    console.log(param.toString());
});

router.get('/list/:who/:level/:type/:horo', function(req, res, next){
    var who = req.params['who'];
    var level = req.params['level'];
    var type = req.params['type'];
    var horo = req.params['horo'];


});

module.exports = router;