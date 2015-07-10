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

router.post('/search', function(req, res, next){
    var char = req.body.char; //名称
    var prop = req.body.prop; //Cool/Smile/Pure
    var type = req.body.type; //级别
    query = {};
    if(char != null && 0!= char)  {
        query.char = char;
    }
    if(prop != null) {
        query.card_type = prop;
    }
    if(type != null) {
        query.lovelive_grade = type;
    }
    total = req.body.total?req.body.total:null;
    page = req.body.page?req.body.page:'1';
    console.log(JSON.stringify(query));
    cardDao.find(query, total, page ,function(count, doc){
        obj = {};
        if(doc.length) {
            obj.flag = true;
            obj.total = count;
            obj.data = doc;
        } else {
            obj.flag = false;
        }
        res.json(JSON.stringify(obj));
    });
});

router.get('/list/:who/:level/:type/:horo', function(req, res, next){
    var who = req.params['who'];
    var level = req.params['level'];
    var type = req.params['type'];
    var horo = req.params['horo'];


});

module.exports = router;