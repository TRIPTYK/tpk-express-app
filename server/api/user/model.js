var mongoose     = require('mongoose');
var Hash 		 = require('password-hash');
var Schema       = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');



var UserSchema = new Schema({
    username: { type: String, unique: true },
    password: { 
    	type: String, 
    	set: function(newValue) {
        	return Hash.isHashed(newValue) ? newValue : Hash.generate(newValue);
    	} 
	}
});

UserSchema.plugin(passportLocalMongoose);


UserSchema.statics.authenticate = function(username, password, callback) {
    this.findOne({ username: username }, function(error, user) {

        if (user && Hash.verify(password, user.password)) {
            callback(null, user);
        } else if (user || !error) {
            // Email or password was invalid (no MongoDB error)
            error = new Error("Your username or password is invalid. Please try again.");
            callback(error, null);
        } else {
            // Something bad happened with MongoDB. You shouldn't run into this often.
            callback(error, null);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);