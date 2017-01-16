'use strict'

import express from 'express';
import todoController from '../controllers/todo.server.controller';
import authenticationMiddleware from '../controllers/authenticationMiddleware.server.controller';

module.exports = function(app) {
	let router = express.Router();

	router.use(authenticationMiddleware.apiAuthentication);
	router.route('/todos').get(todoController.readAll).post(todoController.create);

	router.route('/todos/:todo_id').get(todoController.read).put(todoController.update).delete(todoController.delete);

	app.use('/api', router);

}
