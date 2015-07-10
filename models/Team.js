var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var TeamSchema = new Schema({
    name:String,
    cards:[
        {cardid:String}
    ]
});
var TeamSchema = mongodb.mongoose.model("Team", TeamSchema);
var TeamDAO = function(){};

TeamDAO.prototype.add = function() {

};

TeamDAO.prototype.list = function() {

};

TeamDAO.prototype.upd = function() {

};

module.exports = TeamDAO;