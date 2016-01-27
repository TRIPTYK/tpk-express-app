var Invoice = require('./model');
var _ = require('lodash');
var logger = require('../../utils/logger');

exports.params = function(req, res, next, id) {
    Invoice.findById(id)
        .then(function(invoice) {
            if (!invoice) {
                next(new Error('No invoice with that id'));
            } else {
                req.invoice = invoice;
                next();
            }
        }, function(err) {
            next(err);
        });
};

exports.get = function(req, res, next) {
    Invoice.find({})
        .then(function(invoices) {
            res.json(invoices);
        }, function(err) {
            next(err);
        });
};

exports.getOne = function(req, res, next) {
    var invoice = req.invoice;
    res.json(invoice);
};

exports.put = function(req, res, next) {
    var invoice = req.invoice;

    var update = req.body;

    _.merge(invoice, update);

    invoice.save(function(err, saved) {
        if (err) {
            next(err);
        } else {
            res.json(saved);
        }
    })
};

exports.post = function(req, res, next) {
    var newInvoice = req.body;
    Invoice.create(newInvoice)
        .then(function(invoice) {
            res.json(invoice);
        }, function(err) {
            logger.error(err);
            next(err);
        });
};

exports.delete = function(req, res, next) {
    req.post.remove(function(err, removed) {
        if (err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};