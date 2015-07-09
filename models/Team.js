var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var TeamSchema = new Schema({
    name:String,
    rel:String,
    info:[
        {
            img:String,
            level:String
        }
    ]
});
var TeamSchema = mongodb.mongoose.model("Team", TeamSchema);
var TeamDAO = function(){};
module.exports = TeamDAO;