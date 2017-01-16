'use strict'

var mongoose = require('mongoose');
var config = require('./config');

module.exports = function() {
    mongoose.Promise = global.Promise;
    var db = mongoose.connect(config.db);

    require('../server/models/user.server.model');
    require('../server/models/token.server.model');
    require('../server/models/todo.server.model');

    return db;
}
