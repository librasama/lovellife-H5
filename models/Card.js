var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var CardSchema = new Schema({
    card_id:String,
    card_fullid:String,
    card_type:String,
    card_name:String,
    char:String,
    lovelive_grade:String,
    card_normal:String,
    card_horo:String,
    hp_01:String,
    hp_02:String,
    hp_03:String,
    smile_01:String,
    smile_02:String,
    smile_03:String,
    pure_01:String,
    pure_02:String,
    pure_03:String,
    cool_01:String,
    cool_02:String,
    cool_03:String,
    sp_01:String,
    sp_02:String
});
var Card = mongodb.mongoose.model("Card", CardSchema);
var CardDAO = function(){};
CardDAO.prototype.save = function(obj, cb) {
    var instance = new Card(obj);
    instance.save(function(err){
        cb(err);
    });
};
CardDAO.prototype.find = function(condition, count, page, cb) {
    var query = function(query, count, page, cb){Card.find(query).skip(10*(page-1)).limit(10).exec(function(err, doc){
        if(err == null) cb(count, doc);
    })};
    if(!count) {
        Card.count(condition, function(err, tt){
            console.log("count:"+tt);
            count = Math.floor(tt/10);
            query(condition, count, page, cb);
        });
    } else { query(condition, count, page, cb);}


};
CardDAO.prototype.upd = function(condition, update, options, cb) {
    Card.update(condition, update, function(err, doc){
        if(err) {console.log("更新错误："+err);; return ;}
        cb(doc);
    });
}


module.exports = new CardDAO();