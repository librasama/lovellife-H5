var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lovelife');
exports.mongoose = mongoose;