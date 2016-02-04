var config  = require('../config/config');
var express = require('express');
var router  = require('express').Router();
var jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens

function requireLogin(req, res, next) {
  // if (req.user) {
  //   next(); // allow the next route to run
  // } else {
  //   // require the user to log in
  //   res.redirect("/login"); // or render a form, etc.
  // }
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secrets.jwt, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
}

// api router will mount other routers
// for all our resources
router.use('/clients', requireLogin, require('./client/routes'));
router.use('/invoices', requireLogin, require('./invoice/routes'));
router.use('/participants', requireLogin, require('./participant/routes'));
router.use('/users', requireLogin, require('./user/routes'));




module.exports = router;
