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

// we should encrypt token string before save to database, and decrypt when we need.
TokenSchema.pre('save', function(next){
	if(this.token){
		this.token = edCrypto.encryptString(this.token);
	}
	next();
})
mongoose.model('Token', TokenSchema);