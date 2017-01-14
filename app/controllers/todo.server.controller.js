'use strict'

var Todo = require('mongoose').model('Todo');
var validator = require('is-my-json-valid');
var winston = require('winston')

// TODO schema
// var TodoSchema = new mongoose.Schema({
// 	description: String,
// 	completed: Boolean
// });

var validate = validator({
	required: true,
	type: 'object',
	properties: {
		description: {
			type: 'string',
			required: true
		},
		completed: {
			type: 'boolean',
			required: true
		}
	}
});

module.exports.create = function(req, res) {
	var body = req.body;
	var user = req.session.user;
	validate(body);
	if (validate.errors !== null)
		return res.status(412).send('request contain invalid');

	var todo = new Todo(body);
	todo.author = user._id;
	todo.save().then(function(todo) {
		res.send('Todo created');
	}).catch(function(err) {
		winston.log('error', 'todo.server.controller create method error');
		res.status(400).send("can't create todo");
	})
}

// step 1: readall todo with all user
// step 2: readall todo with particular user
module.exports.readAll = function(req, res) {
	var user = req.session.user;
	Todo.find({
		author: user._id
	}).then(function(todos) {
		res.json(todos);
	}).catch(function(err) {
		winston.log('error', 'todo.server.controller readAll method error')
		res.status(400).send("can't process request");
	});
}


module.exports.read = function(req, res) {
	var todo_id = req.params.todo_id;
	Todo.findById(todo_id).then(function(todo) {
		res.json(todo);
	}).catch(function(error) {
		winston.log('error', 'todo.server.controller read method error');
		res.status(400).send('read failed');
	})
}

module.exports.update = function(req, res) {
	var todo_id = req.params.todo_id;
	var body = req.body;

	Todo.findById(todo_id).then(function(todo) {
		todo.description = body.description;
		todo.competed = body.completed;

		return todo.save();
	}).then(function(todoU){
		res.json(todoU);
	}).catch(function(error) {
		winston.log('error', 'todo.server.controller update method error');
		res.status(400).send('update failed');
	})
}

module.exports.delete = function(req, res) {
	var todo_id = req.params.todo_id;
	Todo.remove({
		_id:todo_id
	}).then(function() {
		res.send('Successfully deleted');
	}).catch(function(error) {
		winston.log('error', 'todo.server.controller delete method error');
		res.status(400).send('delete failed');
	})
}
