'use strict'

var mongoose = require('mongoose');
var config = require('./config');

module.exports = function(){
	mongoose.Promise = global.Promise;
	var db = mongoose.connect(config.db);

	require('../app/models/user.server.model');
	require('../app/models/token.server.model');
	require('../app/models/todo.server.model');

	return db;
}