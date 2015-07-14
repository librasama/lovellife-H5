var router = require('express').Router();
var teamDao = require('../models/Team.js');
var card = require('../models/Card.js');

router.post('/save', function(req, res, next){
    name = req.body.name;
    ids = req.body['players[]'];
    obj = {};
    //实际上从cookie或者session中取得
    obj.userid = '1';
    obj.name = name;
    console.log("players:"+JSON.stringify(ids));
    obj.cards = ids;
    teamDao.add(obj, function (err) {
        var ret = {};
        ret.flag = (err == null);
        res.json(JSON.stringify(ret));
    });

});

router.get('/list', function(req, res, next){
    var userid = '1';
    teamDao.list(userid, function(teams){
       var ret = [];
        function getInfo(i) {
           var team =teams[i];
           name = team.name;
           condition = {};
           condition['$in'] = team.cards;
           var q = {};
           q.card_id = condition;
           card.find(condition, 1, 1, function(err, doc){
               if(err) throw err;
               team.info = doc;
               i++;
               if(i<teams.length) {
                    ret.push(team);
                    getInfo(i);
               } else {
                   res.json(JSON.stringify(ret));
               }
           });
        }
        getInfo(0);
    });

});

router.listTeam = function(userid, cb){
    var userid = userid;
    teamDao.list(userid, function(teams){
        var ret = [];
        function getInfo(i) {
            var team =teams[i];
            name = team.name;
            card.query(team.cards, function(err, doc){
                if(err) throw err;
                team.cardsInfo = doc;
                i++;
                if(i<teams.length) {
                    ret.push(team);
                    getInfo(i);
                } else {
                    cb(ret);
                }
            });
        }
        getInfo(0);
    });
}

/**
 * 队伍数目
 */
router.get('/count', function(req, res, next){
    //userid = req.body.userid;
    var userid = '1';
    teamDao.count(userid, function(count){
        var ret = {};
        console.log("队伍数目："+count);
        ret.count = count;
        res.json(JSON.stringify(ret));
    });
});



module.exports = router;
