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
    var q = {};
    q.userid = userid;
    Team.find(q, function(err, doc){
        if(err) throw err;
        cb(doc);
    });
};

TeamDAO.prototype.upd = function() {

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