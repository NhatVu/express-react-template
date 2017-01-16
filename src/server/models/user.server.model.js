var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var edCrypto = require('../../config/EDCrypto');


var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		match: [/.+\@.+\..+/, 'Please fill valid email address']
	},
	password: {
		type: String,
		validate: [function(password){
			return password && password.length > 6
		}, 'Password must be longer than 6 characters']
	},
	salt :String,
	role: {
		type: String
	},
	providerData : {},
	created: {
		type: Date,
		default: Date.now
	}
});

// statics and methods
/**
 * Pre save, use to create salt and assign password with function encryptPassword
 * @param  {[type]} next){} [description]
 * @return {[type]}           [description]
 */
UserSchema.pre('save', function(next){
	// if salt is undifined
	if(this.password && !this.salt ){
		this.salt = crypto.randomBytes(64).toString('base64');
		this.password = this.encryptPassword(this.password);
	}
	next();
});

/**
 * encryt password to save and to check in authenticate function.
 * @param  {[type]} password [description]
 * @return {[String]}          password after encryption
 */
UserSchema.methods.encryptPassword = function(password){
	return crypto.pbkdf2Sync(password, this.salt, 10000,64,'sha1').toString('base64');
}

/**
 * authenticate the request body(with email and password)
 * @param  body 	request body that contain email and password
 * @return reject error
 *         resolve user
 */
UserSchema.statics.authenticate = function(body){
	var _this = this;
	return new Promise(function(resolve, reject){
		_this.findOne({
			email : body.email
		}, function(err, user){
			if(err)
				return reject(err);
			if(user == null)
				return reject('Invalid email');

			if(user.password == user.encryptPassword(body.password))
				return resolve(user);
			else
				return reject('Invalid password')
		})
	});

}

/**
 * generate token when user login to the system. Only contain user._id, for security
 * first, encrypt stringData, after that, sign with jwt
 * @return token [description]
 */
UserSchema.methods.generateToken = function(){
	var stringData = JSON.stringify({
		id : this._id
	});

	var encrytData = edCrypto.encryptString(stringData);
	var token = jwt.sign({
		token : encrytData
	}, edCrypto.tokenPassword);

	return token;
}

/**
 * find user by valid token, after check valid in Token model.
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
UserSchema.statics.findByToken = function(token){
	var _this = this;
	return new Promise(function(resolve, reject){
		var decryptJWT = jwt.verify(token, edCrypto.tokenPassword);
		var decrytpData = edCrypto.decryptString(decryptJWT.token); // return String
		decrytpData = JSON.parse(decrytpData);

		_this.findOne({
			_id : decrytpData.id
		}, function(err, user){
			if(err)
				return reject(err);

			if(!user)
				return reject('User not found');

			resolve(user);
		})

	});
}

/**
 * send user public data
 * @return {[type]} [description]
 */
UserSchema.methods.toPublicJSON = function() {
	var tempt = {};
	//tempt.id = this.id;
	tempt.email = this.email;
	tempt.created = this.created;

	return tempt;
}

/*

 */
UserSchema.statics.findByEmail = function(email){
	var self = this;
	return new Promise(function(resolve, reject){
		self.find({
			email: email
		}).then(function(user){
			resolve(user);
		}).catch(function(err){
			return reject(err);
		})
	});
}

mongoose.model('User', UserSchema);
