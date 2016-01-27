var router = require('express').Router();

// api router will mount other routers
// for all our resources
router.use('/clients', require('./client/routes'));
router.use('/invoices', require('./invoice/routes'));

module.exports = router;
