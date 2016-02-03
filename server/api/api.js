var express = require('express');
var router = require('express').Router();

function requireLogin(req, res, next) {
  if (req.user) {
    next(); // allow the next route to run
  } else {
    // require the user to log in
    res.redirect("/login"); // or render a form, etc.
  }
}

// api router will mount other routers
// for all our resources
router.use('/clients', requireLogin, require('./client/routes'));
router.use('/invoices', requireLogin, require('./invoice/routes'));
router.use('/participants', requireLogin, require('./participant/routes'));
router.use('/users', requireLogin, require('./user/routes'));




module.exports = router;
