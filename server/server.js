var express      = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session')
var api          = require('./api/api');
var config       = require('./config/config');
var logger       = require('./utils/logger');
var errorHandler = require('express-error-middleware');
var passport     = require('passport');
var helmet       = require('helmet');


var app          = express();
// db.url is different depending on NODE_ENV
require('mongoose').connect(config.db.url);

if (config.seed) {
    require('./utils/seed');
}

//Helmet secured
app.use(helmet());
app.use(express.static('public'));
app.use(cookieParser('secret'));
app.use(session('triptyk secret'));
app.use(passport.initialize());
app.use(passport.session());


// setup the app middlware
require('./middleware/appMiddlware')(app);
require('./middleware/appSecurity')(app);



// setup the api
app.use('/api', api);



// set up global error handling
app.use(errorHandler.NotFoundMiddleware); // if a request is not handled before this a NotFoundError will be sent into next
app.use(errorHandler.ApiErrorsMiddleware);


// export the app for testing
module.exports = app;