var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({
	description: String,
	completed: Boolean
});

mongoose.model('Todo', TodoSchema);