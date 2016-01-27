var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/clients', require('./client/routes'));

module.exports = router;
