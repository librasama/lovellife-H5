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

router.listTeam = function(userid, cb){
    var userid = userid;
    teamDao.list(userid, function(teams){
        var ret = [];
        var i =0;
        function getInfo(i) {
            if(i>= teams.length) {
                cb(ret);
            } else {
                var team =teams[i];
                console.log("teams.length:"+teams.length+"getInfo(i)="+i + "  team="+JSON.stringify(team));
                name = team.name;
                card.query(team.cards, function(err, doc){
                    if(err) throw err;
                    team.cardsInfo = doc;
                    if(i<=teams.length-1) {
                        i += 1;
                        ret.push(team);
                        getInfo(i);
                    } else {
                        cb(ret);
                    }
                });
            }
        }
        getInfo(i);
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

router.post('/del', function(req, res, next){
    //userid = req.body.userid;
    var userid = '1';
    var name = req.body.id;
    teamDao.del(userid, name, function(){
        var ret = {};
        ret.flag = true;
        res.json(JSON.stringify(ret));
    });

});


module.exports = router;
