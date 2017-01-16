var mongoose = require('mongoose');
var edCrypto = require('../../config/EDCrypto');

var TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        validate: [
            function(token) {
                return token && token.length > 6;
            },
            'Invalid token length'
        ]
    },
    provider: String,
    createdAt: {
        type: Date,
        default: Date.now,
				expires: 60*60*24 // it create index. to see it, db.tokens.getIndexes()
    }
});


mongoose.model('Token', TokenSchema);
