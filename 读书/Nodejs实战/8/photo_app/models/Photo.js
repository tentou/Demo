var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/photos', { config: { autoIndex: false }});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    // yay!
    console.log('haha')
});

var schema = new mongoose.Schema({
    name: String,
    path: String
});

var Photo = mongoose.model('Photo', schema);
module.exports = Photo;

