var mongoose = require('mongoose');
var edCrypto = require('../../config/EDCrypto');

var TokenSchema = new mongoose.Schema({
	token: {
		type: String,
		required: true,
		validate: [function(token){
			return token && token.length > 6;
		}, 'Invalid token length']
	},
	lastVisited: {
		type: Date,
		required: true
	}
});


mongoose.model('Token', TokenSchema);