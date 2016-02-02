var passport = require('passport');
var config = require('../config/config');
var PassportLocalStrategy = require('passport-local');
var PassportConfig     	  = require('../config/passport');
var JwtStrategy = require('passport-jwt').Strategy;

module.exports = function(app) {
    passport.use(new JwtStrategy(config.jwtOptions, function(jwt_payload, done) {
	    User.findOne({id: jwt_payload.sub}, function(err, user) {
	    	console.log(user);
	        if (err) {
	            return done(err, false);
	        }
	        if (user) {
	            done(null, user);
	        } else {
	            done(null, false);
	            // or you could create a new account 
	        }
	    });
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.route('/login')
		.post(login)
		.get(function (req, res) {
			res.send('<form action="/login" method="post"><div><label>Username:</label><input type="text" name="username"/></div><div><label>Password:</label><input type="password" name="password"/></div><div><input type="submit" value="Log In"/></div></form>');
		}
	);

	app.route('/logout')
		 .get(logout);

	function logout(req, res){
	  if(req.isAuthenticated()){
	    req.logout();
	  }
	  res.redirect('/login');
	}

	function login(req, res, next) {
	  // ask passport to authenticate
	  passport.authenticate('local', function(err, user, info) {

	    if (err) {
	      return next(err);
	    }
	    if (!user) {
	      req.session.messages = info.message;
	      return res.redirect('/login');
	    }

	    req.logIn(user, function(err) {
	      if (err) {
	        req.session.messages = "Error";
	        return next(err);
	      }

	      // set the message
	      req.session.messages = "Login successfully";
	      return res.redirect('/api/clients');
	    });
	    
	  })(req, res, next);
	}
};