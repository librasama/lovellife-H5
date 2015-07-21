var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var TeamSchema = new Schema({
    userid:String,
    name:String,
    cards:[],
    cardsInfo:[]
});
var Team = mongodb.mongoose.model("Team", TeamSchema);
var TeamDAO = function(){};

TeamDAO.prototype.add = function(team, cb) {
    var instance = new Team(obj);
    instance.save(function(err){
        cb(err);
    });
};

TeamDAO.prototype.list = function(userid, cb) {
    console.log("开始读库");
    var q = {};
    q.userid = userid;
    Team.find(q, function(err, doc){
        console.log("返回结果:err"+err+"   doc:"+doc);
        if(err) throw err;
        cb(doc);
    });
};

TeamDAO.prototype.del = function(userid, name, cb) {
    var q = {};
    q.userid = userid;
    q.name = name;
    Team.remove(q, function(e){
        if(e) throw e;
        cb();
    });
};

TeamDAO.prototype.count = function(userid, cb){
    var q = {};
    q.userid = userid;
    Team.find(q, function(err, doc){
        if(err) throw err;
        cb(doc.length);
    });
};

module.exports = new TeamDAO();