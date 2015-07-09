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
    console.log("2bbbb");
    var instance = new Card(obj);
    instance.save(function(err){
        cb(err);
    });
};

module.exports = new CardDAO();