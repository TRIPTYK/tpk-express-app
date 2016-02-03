var config                = require('../config/config');
var PassportConfig     	  = require('../config/passport');
var passport              = require('passport');
var PassportLocalStrategy = require('passport-local');
var jwt                   = require('jsonwebtoken'); // used to create, sign, and verify tokens


module.exports = function(app) {

	

	app.use(passport.initialize());
	app.use(passport.session());

	app.route('/getToken')
		.post(
			function(req, res, next) {
				passport.authenticate('local', function(err, user, info) {
					
					if (err) { return next(err); }

					if (!user) { return res.redirect('/login'); }

					req.logIn(user, function(err) {
						if (err) { return next(err); }

						var token = jwt.sign(user, config.secrets.jwt, {
				          expiresInMinutes: 1440 // expires in 24 hours
				        });

				        //return the information including token as JSON

				        res.json({
				          success: true,
				          token: token
				        });


					});

				})(req, res, next);
			}
		)
		.get(function (req, res) {
			res.send('<form action="/login" method="post"><div><label>Username:</label><input type="text" name="username"/></div><div><label>Password:</label><input type="password" name="password"/></div><div><input type="submit" value="Log In"/></div></form>');
		}
	);

	app.route('/login')
		.post(
			function(req, res, next) {
				passport.authenticate('local', function(err, user, info) {
					
					if (err) { return next(err); }

					if (!user) { return res.redirect('/login'); }

					req.logIn(user, function(err) {
						if (err) { return next(err); }

						var token = jwt.sign(user.username, config.secrets.jwt, {
				          expiresInMinutes: 1440 // expires in 24 hours
				        });

				        // return the information including token as JSON
				        // res.json({
				        //   success: true,
				        //   token: token
				        // });

						req.session.user = user;
				        req.session.token = token;

						return res.redirect('/api/participants');
						//return res.redirect('/users/' + req.user.username);
					});

				})(req, res, next);
			}
		)
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

};