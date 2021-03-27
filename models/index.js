const {url} = require("../config/config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

db.url = url;

db.User = require('./user.model.js')(mongoose);
db.Post = require('./post.model.js')(mongoose);
db.Comment = require('./comment.model.js')(mongoose);

module.exports = db;
