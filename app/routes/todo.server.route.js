'use strict'

var express = require('express');
var todoController = require('../controllers/todo.server.controller');

module.exports = function(app){
	var router = express.Router();

	router.route('/todos')
			.get(todoController.readAll)
			.post(todoController.create);

	router.route('/todos/:todo_id')
			.get(todoController.read)
			.put(todoController.update)
			.delete(todoController.delete);

	app.use('/api', router);

}