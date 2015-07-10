var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var CardSchema = new Schema({
    card_name:String,
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
CardDAO.prototype.find = function(query, cb) {
    Card.find(query, function(err, doc){
        if(err == null) cb(doc);
    });

};
CardDAO.prototype.upd = function(condition, update, options, cb) {
    Card.update(condition, update, function(err, doc){
        if(err) {console.log("更新错误："+err);; return ;}
        cb(doc);
    });
}


module.exports = new CardDAO();