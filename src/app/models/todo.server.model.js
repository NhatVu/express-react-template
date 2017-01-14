var mongoose = require('mongoose');
var TodoSchema = new mongoose.Schema({
	description: String,
	completed: Boolean,
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
		}
});

mongoose.model('Todo', TodoSchema);