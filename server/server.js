var express = require('express');
var app = express();
var api = require('./api/api');
var config = require('./config/config');
var logger = require('./utils/logger');
var errorHandler = require('express-error-middleware');

// db.url is different depending on NODE_ENV
require('mongoose').connect(config.db.url);

// if (config.seed) {
//     require('./util/seed');
// }
// setup the app middlware
require('./middleware/appMiddlware')(app);

// setup the api
app.use('/api', api);

// set up global error handling
app.use(errorHandler.NotFoundMiddleware); // if a request is not handled before this a NotFoundError will be sent into next
app.use(errorHandler.ApiErrorsMiddleware);

// export the app for testing
module.exports = app;